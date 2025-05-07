"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { TestTimer } from "@/components/test-timer"
import { QuestionNavigation } from "@/components/question-navigation"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { submitTest, saveUserResponse } from "@/lib/test-actions"
import type { Test, UserResponse } from "@/types"

interface TestInterfaceProps {
  test: Test
  userId: string
}

export function TestInterface({ test, userId }: TestInterfaceProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userResponses, setUserResponses] = useState<UserResponse[]>([])
  const [timeRemaining, setTimeRemaining] = useState(test.duration_minutes * 60)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [userTestId, setUserTestId] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize user responses
  useEffect(() => {
    const initialResponses = test.questions.map((question) => ({
      question_id: question.id,
      selected_option_id: null,
      is_flagged: false,
      time_spent_seconds: 0,
    }))
    setUserResponses(initialResponses)

    // Create user test record
    const createUserTest = async () => {
      try {
        const response = await fetch("/api/tests/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            test_id: test.id,
            user_id: userId,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to start test")
        }

        const data = await response.json()
        setUserTestId(data.id)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to start test. Please try again.",
          variant: "destructive",
        })
      }
    }

    createUserTest()

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-submit when time is up
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [test, userId])

  const currentQuestion = test.questions[currentQuestionIndex]

  const handleOptionSelect = async (optionId: string) => {
    const updatedResponses = [...userResponses]
    updatedResponses[currentQuestionIndex].selected_option_id = optionId

    setUserResponses(updatedResponses)

    // Save response to database
    if (userTestId) {
      try {
        await saveUserResponse({
          user_test_id: userTestId,
          question_id: currentQuestion.id,
          selected_option_id: optionId,
          is_flagged: updatedResponses[currentQuestionIndex].is_flagged,
        })
      } catch (error) {
        console.error("Failed to save response:", error)
      }
    }
  }

  const handleFlagQuestion = async () => {
    const updatedResponses = [...userResponses]
    updatedResponses[currentQuestionIndex].is_flagged = !updatedResponses[currentQuestionIndex].is_flagged

    setUserResponses(updatedResponses)

    // Save flag status to database
    if (userTestId) {
      try {
        await saveUserResponse({
          user_test_id: userTestId,
          question_id: currentQuestion.id,
          selected_option_id: updatedResponses[currentQuestionIndex].selected_option_id,
          is_flagged: updatedResponses[currentQuestionIndex].is_flagged,
        })
      } catch (error) {
        console.error("Failed to save flag status:", error)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const handleSubmitTest = async () => {
    if (!userTestId) return

    setIsSubmitting(true)

    try {
      const result = await submitTest({
        user_test_id: userTestId,
        time_spent_seconds: test.duration_minutes * 60 - timeRemaining,
      })

      // Redirect to results page
      router.push(`/tests/results/${userTestId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit test. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const answeredCount = userResponses.filter((response) => response.selected_option_id !== null).length

  const flaggedCount = userResponses.filter((response) => response.is_flagged).length

  const progressPercentage = (answeredCount / test.questions.length) * 100

  return (
    <div className="flex h-screen flex-col">
      {/* Test Header */}
      <div className="sticky top-0 z-10 border-b bg-background p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{test.title}</h1>
            <p className="text-sm text-muted-foreground">
              {test.questions.length} Questions • {test.duration_minutes} Minutes
            </p>
          </div>
          <div className="flex items-center gap-4">
            <TestTimer timeRemaining={timeRemaining} />
            <Button variant="default" onClick={() => setShowSubmitDialog(true)} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Test"
              )}
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span>
              Progress: {answeredCount}/{test.questions.length} questions answered
            </span>
            <span>{flaggedCount} questions flagged for review</span>
          </div>
          <Progress value={progressPercentage} className="mt-2" />
        </div>
      </div>

      {/* Test Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Question Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium">
                Question {currentQuestionIndex + 1} of {test.questions.length}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFlagQuestion}
                className={
                  userResponses[currentQuestionIndex]?.is_flagged
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
                    : ""
                }
              >
                {userResponses[currentQuestionIndex]?.is_flagged ? (
                  <>
                    <Icons.check className="mr-2 h-4 w-4" />
                    Flagged
                  </>
                ) : (
                  <>
                    <Icons.help className="mr-2 h-4 w-4" />
                    Flag for Review
                  </>
                )}
              </Button>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-lg">{currentQuestion.question_text}</p>
                </div>
                {currentQuestion.image_url && (
                  <div className="mt-4 flex justify-center">
                    <Image
                      src={currentQuestion.image_url || "/placeholder.svg"}
                      alt="Question image"
                      width={400}
                      height={300}
                      className="rounded-md"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                    userResponses[currentQuestionIndex]?.selected_option_id === option.id
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        userResponses[currentQuestionIndex]?.selected_option_id === option.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground"
                      }`}
                    >
                      {userResponses[currentQuestionIndex]?.selected_option_id === option.id && (
                        <Icons.check className="h-3 w-3" />
                      )}
                    </div>
                    <span>{option.option_text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === test.questions.length - 1}
              >
                Next
                <Icons.chevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Question Navigation Sidebar */}
        <div className="hidden w-64 border-l bg-muted/30 p-4 lg:block">
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="flagged" className="flex-1">
                Flagged
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <QuestionNavigation
                questions={test.questions}
                userResponses={userResponses}
                currentIndex={currentQuestionIndex}
                onQuestionClick={handleJumpToQuestion}
              />
            </TabsContent>
            <TabsContent value="flagged" className="mt-4">
              <QuestionNavigation
                questions={test.questions}
                userResponses={userResponses}
                currentIndex={currentQuestionIndex}
                onQuestionClick={handleJumpToQuestion}
                showOnlyFlagged
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <ConfirmDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        title="Submit Test"
        description={`Are you sure you want to submit this test? You have answered ${answeredCount} out of ${test.questions.length} questions.`}
        onConfirm={handleSubmitTest}
        confirmText="Submit Test"
        cancelText="Continue Test"
      />
    </div>
  )
}
