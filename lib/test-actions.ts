"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "@/lib/supabase"
import type { Test, UserTest, UserResponse, TestResults } from "@/types"

export async function getTests(): Promise<Test[]> {
  const { data, error } = await supabase
    .from("tests")
    .select(`
      *,
      exam_category:exam_categories(*),
      questions:questions(id)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tests:", error)
    throw new Error("Failed to fetch tests")
  }

  return data.map((test) => ({
    ...test,
    questions: test.questions || [],
  }))
}

export async function getTestById(id: string): Promise<Test | null> {
  const { data, error } = await supabase
    .from("tests")
    .select(`
      *,
      exam_category:exam_categories(*),
      questions:questions(
        *,
        options:options(*),
        topics:question_topics(topic:topics(*))
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching test:", error)
    return null
  }

  // Transform the data to match our types
  const transformedQuestions = data.questions.map((question) => ({
    ...question,
    topics: question.topics.map((t) => t.topic),
  }))

  return {
    ...data,
    questions: transformedQuestions,
  }
}

export async function createTest(testData: any): Promise<Test> {
  const { data, error } = await supabase.from("tests").insert(testData).select().single()

  if (error) {
    console.error("Error creating test:", error)
    throw new Error("Failed to create test")
  }

  revalidatePath("/admin/tests")
  return data
}

export async function updateTest(testData: any): Promise<Test> {
  const { id, ...rest } = testData

  const { data, error } = await supabase.from("tests").update(rest).eq("id", id).select().single()

  if (error) {
    console.error("Error updating test:", error)
    throw new Error("Failed to update test")
  }

  revalidatePath("/admin/tests")
  revalidatePath(`/admin/tests/${id}`)
  return data
}

export async function deleteTest(id: string): Promise<void> {
  const { error } = await supabase.from("tests").delete().eq("id", id)

  if (error) {
    console.error("Error deleting test:", error)
    throw new Error("Failed to delete test")
  }

  revalidatePath("/admin/tests")
}

export async function publishTest(id: string): Promise<void> {
  const { error } = await supabase.from("tests").update({ is_published: true }).eq("id", id)

  if (error) {
    console.error("Error publishing test:", error)
    throw new Error("Failed to publish test")
  }

  revalidatePath("/admin/tests")
}

export async function unpublishTest(id: string): Promise<void> {
  const { error } = await supabase.from("tests").update({ is_published: false }).eq("id", id)

  if (error) {
    console.error("Error unpublishing test:", error)
    throw new Error("Failed to unpublish test")
  }

  revalidatePath("/admin/tests")
}

export async function startTest(userId: string, testId: string): Promise<UserTest> {
  const { data, error } = await supabase
    .from("user_tests")
    .insert({
      user_id: userId,
      test_id: testId,
      status: "in_progress",
      start_time: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error starting test:", error)
    throw new Error("Failed to start test")
  }

  return data
}

export async function saveUserResponse(responseData: any): Promise<UserResponse> {
  const { data: existingResponse } = await supabase
    .from("user_responses")
    .select("*")
    .eq("user_test_id", responseData.user_test_id)
    .eq("question_id", responseData.question_id)
    .single()

  let data

  if (existingResponse) {
    // Update existing response
    const { data: updatedData, error } = await supabase
      .from("user_responses")
      .update(responseData)
      .eq("id", existingResponse.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating user response:", error)
      throw new Error("Failed to update response")
    }

    data = updatedData
  } else {
    // Create new response
    const { data: newData, error } = await supabase.from("user_responses").insert(responseData).select().single()

    if (error) {
      console.error("Error saving user response:", error)
      throw new Error("Failed to save response")
    }

    data = newData
  }

  return data
}

export async function submitTest(submitData: any): Promise<UserTest> {
  const { user_test_id, time_spent_seconds } = submitData

  // Get the user test
  const { data: userTest, error: userTestError } = await supabase
    .from("user_tests")
    .select("*, test:tests(*)")
    .eq("id", user_test_id)
    .single()

  if (userTestError) {
    console.error("Error fetching user test:", userTestError)
    throw new Error("Failed to submit test")
  }

  // Get all responses for this test
  const { data: responses, error: responsesError } = await supabase
    .from("user_responses")
    .select(`
      *,
      question:questions(
        *,
        options:options(*)
      )
    `)
    .eq("user_test_id", user_test_id)

  if (responsesError) {
    console.error("Error fetching responses:", responsesError)
    throw new Error("Failed to submit test")
  }

  // Calculate score
  let score = 0
  let totalPoints = 0

  // Update each response with is_correct flag
  for (const response of responses) {
    const question = response.question
    const selectedOption = question.options.find((o) => o.id === response.selected_option_id)

    const isCorrect = selectedOption?.is_correct || false
    totalPoints += question.points || 1

    if (isCorrect) {
      score += question.points || 1
    }

    // Update the response with is_correct flag
    await supabase.from("user_responses").update({ is_correct: isCorrect }).eq("id", response.id)
  }

  const percentage = totalPoints > 0 ? (score / totalPoints) * 100 : 0

  // Update the user test
  const { data, error } = await supabase
    .from("user_tests")
    .update({
      status: "completed",
      score,
      percentage,
      end_time: new Date().toISOString(),
      time_spent_seconds,
    })
    .eq("id", user_test_id)
    .select()
    .single()

  if (error) {
    console.error("Error submitting test:", error)
    throw new Error("Failed to submit test")
  }

  // Update user progress
  await updateUserProgress(
    userTest.user_id,
    userTest.test.exam_category_id,
    score,
    percentage,
    time_spent_seconds,
    responses,
  )

  return data
}

async function updateUserProgress(
  userId: string,
  examCategoryId: string,
  score: number,
  percentage: number,
  timeSpentSeconds: number,
  responses: any[],
): Promise<void> {
  // Check if user progress exists
  const { data: existingProgress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("exam_category_id", examCategoryId)
    .single()

  // Analyze strengths and weaknesses
  const topicPerformance = responses.reduce(
    (acc, response) => {
      const question = response.question
      const topics = question.topics || []

      topics.forEach((topic) => {
        if (!acc[topic.name]) {
          acc[topic.name] = {
            total: 0,
            correct: 0,
            percentage: 0,
          }
        }

        acc[topic.name].total += 1
        if (response.is_correct) {
          acc[topic.name].correct += 1
        }

        acc[topic.name].percentage = (acc[topic.name].correct / acc[topic.name].total) * 100
      })

      return acc
    },
    {} as Record<string, { total: number; correct: number; percentage: number }>,
  )

  // Identify strengths and weaknesses
  const strengths = Object.keys(topicPerformance).filter((topic) => topicPerformance[topic].percentage >= 70)

  const weaknesses = Object.keys(topicPerformance).filter((topic) => topicPerformance[topic].percentage < 70)

  if (existingProgress) {
    // Update existing progress
    const newAverage =
      (existingProgress.average_score * existingProgress.tests_completed + percentage) /
      (existingProgress.tests_completed + 1)

    await supabase
      .from("user_progress")
      .update({
        tests_completed: existingProgress.tests_completed + 1,
        average_score: newAverage,
        total_time_spent_seconds: existingProgress.total_time_spent_seconds + timeSpentSeconds,
        strengths,
        weaknesses,
        last_activity_date: new Date().toISOString(),
      })
      .eq("id", existingProgress.id)
  } else {
    // Create new progress
    await supabase.from("user_progress").insert({
      user_id: userId,
      exam_category_id: examCategoryId,
      tests_completed: 1,
      average_score: percentage,
      total_time_spent_seconds: timeSpentSeconds,
      strengths,
      weaknesses,
      last_activity_date: new Date().toISOString(),
    })
  }

  // Check for badges
  await checkAndAwardBadges(userId, percentage, timeSpentSeconds)
}

async function checkAndAwardBadges(userId: string, percentage: number, timeSpentSeconds: number): Promise<void> {
  // Get all user tests
  const { data: userTests } = await supabase
    .from("user_tests")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "completed")

  // Check for first test badge
  if (userTests?.length === 1) {
    await awardBadge(userId, "First Test")
  }

  // Check for perfect score badge
  if (percentage === 100) {
    await awardBadge(userId, "Perfect Score")
  }

  // Check for speed demon badge (completed in less than half the allocated time)
  const { data: test } = await supabase
    .from("tests")
    .select("duration_minutes")
    .eq("id", userTests?.[userTests.length - 1]?.test_id)
    .single()

  if (test && timeSpentSeconds < (test.duration_minutes * 60) / 2) {
    await awardBadge(userId, "Speed Demon")
  }

  // Check for study streak
  const { data: userProfile } = await supabase
    .from("user_profiles")
    .select("streak_days, last_study_date")
    .eq("id", userId)
    .single()

  if (userProfile) {
    const today = new Date().toISOString().split("T")[0]
    const lastStudyDate = userProfile.last_study_date
      ? new Date(userProfile.last_study_date).toISOString().split("T")[0]
      : null

    let newStreakDays = userProfile.streak_days || 0

    if (lastStudyDate !== today) {
      if (lastStudyDate && new Date(today).getTime() - new Date(lastStudyDate).getTime() <= 86400000) {
        // If last study was yesterday, increment streak
        newStreakDays += 1
      } else {
        // If last study was not yesterday, reset streak
        newStreakDays = 1
      }

      // Update user profile
      await supabase
        .from("user_profiles")
        .update({
          streak_days: newStreakDays,
          last_study_date: today,
        })
        .eq("id", userId)

      // Check for streak badge
      if (newStreakDays >= 7) {
        await awardBadge(userId, "Study Streak")
      }
    }
  }
}

async function awardBadge(userId: string, badgeName: string): Promise<void> {
  // Get badge ID
  const { data: badge } = await supabase.from("badges").select("id").eq("name", badgeName).single()

  if (!badge) return

  // Check if user already has this badge
  const { data: existingBadge } = await supabase
    .from("user_badges")
    .select("id")
    .eq("user_id", userId)
    .eq("badge_id", badge.id)
    .single()

  if (existingBadge) return

  // Award badge
  await supabase.from("user_badges").insert({
    user_id: userId,
    badge_id: badge.id,
  })
}

export async function getUserTestResults(userTestId: string, userId: string): Promise<TestResults | null> {
  // Verify the user owns this test
  const { data: userTest, error: userTestError } = await supabase
    .from("user_tests")
    .select(`
      *,
      test:tests(
        *,
        exam_category:exam_categories(*),
        questions:questions(
          *,
          options:options(*),
          topics:question_topics(topic:topics(*))
        )
      )
    `)
    .eq("id", userTestId)
    .eq("user_id", userId)
    .single()

  if (userTestError || !userTest) {
    console.error("Error fetching user test:", userTestError)
    return null
  }

  // Get responses
  const { data: responses, error: responsesError } = await supabase
    .from("user_responses")
    .select("*")
    .eq("user_test_id", userTestId)

  if (responsesError) {
    console.error("Error fetching responses:", responsesError)
    return null
  }

  // Transform the data to match our types
  const transformedQuestions = userTest.test.questions.map((question) => ({
    ...question,
    topics: question.topics.map((t) => t.topic),
  }))

  const transformedTest = {
    ...userTest.test,
    questions: transformedQuestions,
  }

  return {
    id: userTest.id,
    user_id: userTest.user_id,
    test_id: userTest.test_id,
    status: userTest.status,
    score: userTest.score,
    percentage: userTest.percentage,
    start_time: userTest.start_time,
    end_time: userTest.end_time,
    time_spent_seconds: userTest.time_spent_seconds,
    test: transformedTest,
    responses,
  }
}
