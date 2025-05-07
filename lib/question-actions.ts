"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "@/lib/supabase"
import type { Question } from "@/types"

export async function getQuestionsByTestId(testId: string): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      options:options(*),
      topics:question_topics(topic:topics(*))
    `)
    .eq("test_id", testId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching questions:", error)
    throw new Error("Failed to fetch questions")
  }

  // Transform the data to match our types
  return data.map((question) => ({
    ...question,
    topics: question.topics.map((t) => t.topic),
  }))
}

export async function getQuestionById(id: string): Promise<Question | null> {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      options:options(*),
      topics:question_topics(topic:topics(*))
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching question:", error)
    return null
  }

  // Transform the data to match our types
  return {
    ...data,
    topics: data.topics.map((t) => t.topic),
  }
}

export async function createQuestion(formData: FormData): Promise<Question> {
  // Extract basic question data
  const testId = formData.get("test_id") as string
  const questionText = formData.get("question_text") as string
  const questionType = formData.get("question_type") as string
  const difficultyLevel = formData.get("difficulty_level") as string
  const points = Number.parseInt(formData.get("points") as string)
  const explanation = formData.get("explanation") as string
  const topicIdsJson = formData.get("topic_ids") as string
  const optionsJson = formData.get("options") as string

  const topicIds = topicIdsJson ? JSON.parse(topicIdsJson) : []
  const options = optionsJson ? JSON.parse(optionsJson) : []

  // Handle image upload if present
  let imageUrl = null
  const image = formData.get("image") as File

  if (image && image.size > 0) {
    const fileName = `${Date.now()}-${image.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("question-images")
      .upload(fileName, image)

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      throw new Error("Failed to upload image")
    }

    const { data: publicUrlData } = supabase.storage.from("question-images").getPublicUrl(fileName)

    imageUrl = publicUrlData.publicUrl
  }

  // Create question
  const { data: question, error: questionError } = await supabase
    .from("questions")
    .insert({
      test_id: testId,
      question_text: questionText,
      question_type: questionType,
      difficulty_level: difficultyLevel,
      points,
      explanation: explanation || null,
      image_url: imageUrl,
    })
    .select()
    .single()

  if (questionError) {
    console.error("Error creating question:", questionError)
    throw new Error("Failed to create question")
  }

  // Create options
  for (const option of options) {
    const { error: optionError } = await supabase.from("options").insert({
      question_id: question.id,
      option_text: option.option_text,
      is_correct: option.is_correct,
    })

    if (optionError) {
      console.error("Error creating option:", optionError)
      throw new Error("Failed to create option")
    }
  }

  // Link topics
  for (const topicId of topicIds) {
    const { error: topicError } = await supabase.from("question_topics").insert({
      question_id: question.id,
      topic_id: topicId,
    })

    if (topicError) {
      console.error("Error linking topic:", topicError)
      throw new Error("Failed to link topic")
    }
  }

  revalidatePath(`/admin/tests/${testId}/questions`)

  // Return the created question
  const createdQuestion = await getQuestionById(question.id)
  return createdQuestion!
}

export async function updateQuestion(formData: FormData): Promise<Question> {
  // Extract basic question data
  const id = formData.get("id") as string
  const testId = formData.get("test_id") as string
  const questionText = formData.get("question_text") as string
  const questionType = formData.get("question_type") as string
  const difficultyLevel = formData.get("difficulty_level") as string
  const points = Number.parseInt(formData.get("points") as string)
  const explanation = formData.get("explanation") as string
  const topicIdsJson = formData.get("topic_ids") as string
  const optionsJson = formData.get("options") as string
  const removeImage = formData.get("remove_image") === "true"

  const topicIds = topicIdsJson ? JSON.parse(topicIdsJson) : []
  const options = optionsJson ? JSON.parse(optionsJson) : []

  // Get existing question
  const existingQuestion = await getQuestionById(id)
  if (!existingQuestion) {
    throw new Error("Question not found")
  }

  // Handle image upload or removal
  let imageUrl = existingQuestion.image_url

  if (removeImage) {
    // Remove existing image
    if (imageUrl) {
      const fileName = imageUrl.split("/").pop()
      if (fileName) {
        await supabase.storage.from("question-images").remove([fileName])
      }
      imageUrl = null
    }
  } else {
    const image = formData.get("image") as File
    if (image && image.size > 0) {
      // Remove existing image if there is one
      if (imageUrl) {
        const fileName = imageUrl.split("/").pop()
        if (fileName) {
          await supabase.storage.from("question-images").remove([fileName])
        }
      }

      // Upload new image
      const fileName = `${Date.now()}-${image.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("question-images")
        .upload(fileName, image)

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        throw new Error("Failed to upload image")
      }

      const { data: publicUrlData } = supabase.storage.from("question-images").getPublicUrl(fileName)

      imageUrl = publicUrlData.publicUrl
    }
  }

  // Update question
  const { data: question, error: questionError } = await supabase
    .from("questions")
    .update({
      question_text: questionText,
      question_type: questionType,
      difficulty_level: difficultyLevel,
      points,
      explanation: explanation || null,
      image_url: imageUrl,
    })
    .eq("id", id)
    .select()
    .single()

  if (questionError) {
    console.error("Error updating question:", questionError)
    throw new Error("Failed to update question")
  }

  // Update options
  // First, get existing options
  const { data: existingOptions } = await supabase.from("options").select("*").eq("question_id", id)

  // Create a map of existing options by ID
  const existingOptionsMap = new Map()
  existingOptions?.forEach((option) => {
    existingOptionsMap.set(option.id, option)
  })

  // Process each option
  for (const option of options) {
    if (option.id) {
      // Update existing option
      const { error: optionError } = await supabase
        .from("options")
        .update({
          option_text: option.option_text,
          is_correct: option.is_correct,
        })
        .eq("id", option.id)

      if (optionError) {
        console.error("Error updating option:", optionError)
        throw new Error("Failed to update option")
      }

      // Remove from map to track which ones to delete
      existingOptionsMap.delete(option.id)
    } else {
      // Create new option
      const { error: optionError } = await supabase.from("options").insert({
        question_id: id,
        option_text: option.option_text,
        is_correct: option.is_correct,
      })

      if (optionError) {
        console.error("Error creating option:", optionError)
        throw new Error("Failed to create option")
      }
    }
  }

  // Delete options that weren't in the update
  for (const optionId of existingOptionsMap.keys()) {
    const { error: deleteError } = await supabase.from("options").delete().eq("id", optionId)

    if (deleteError) {
      console.error("Error deleting option:", deleteError)
      throw new Error("Failed to delete option")
    }
  }

  // Update topics
  // First, delete all existing topic links
  const { error: deleteTopicsError } = await supabase.from("question_topics").delete().eq("question_id", id)

  if (deleteTopicsError) {
    console.error("Error deleting topics:", deleteTopicsError)
    throw new Error("Failed to update topics")
  }

  // Then create new topic links
  for (const topicId of topicIds) {
    const { error: topicError } = await supabase.from("question_topics").insert({
      question_id: id,
      topic_id: topicId,
    })

    if (topicError) {
      console.error("Error linking topic:", topicError)
      throw new Error("Failed to link topic")
    }
  }

  revalidatePath(`/admin/tests/${testId}/questions`)
  revalidatePath(`/admin/tests/${testId}/questions/${id}`)

  // Return the updated question
  const updatedQuestion = await getQuestionById(id)
  return updatedQuestion!
}

export async function deleteQuestion(id: string): Promise<void> {
  // Get the question to get the test ID for revalidation
  const question = await getQuestionById(id)
  if (!question) {
    throw new Error("Question not found")
  }

  // Delete the question (cascade will handle options and topic links)
  const { error } = await supabase.from("questions").delete().eq("id", id)

  if (error) {
    console.error("Error deleting question:", error)
    throw new Error("Failed to delete question")
  }

  // If there's an image, delete it from storage
  if (question.image_url) {
    const fileName = question.image_url.split("/").pop()
    if (fileName) {
      await supabase.storage.from("question-images").remove([fileName])
    }
  }

  revalidatePath(`/admin/tests/${question.test_id}/questions`)
}
