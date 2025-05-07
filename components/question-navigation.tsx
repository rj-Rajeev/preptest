"use client"

import { cn } from "@/lib/utils"
import type { Question, UserResponse } from "@/types"

interface QuestionNavigationProps {
  questions: Question[]
  userResponses: UserResponse[]
  currentIndex: number
  onQuestionClick: (index: number) => void
  showOnlyFlagged?: boolean
}

export function QuestionNavigation({
  questions,
  userResponses,
  currentIndex,
  onQuestionClick,
  showOnlyFlagged = false,
}: QuestionNavigationProps) {
  const filteredQuestions = showOnlyFlagged
    ? questions.filter((_, index) => userResponses[index]?.is_flagged)
    : questions

  if (filteredQuestions.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
        No flagged questions yet.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {filteredQuestions.map((question, filteredIndex) => {
        const originalIndex = showOnlyFlagged ? questions.findIndex((q) => q.id === question.id) : filteredIndex

        const response = userResponses[originalIndex]
        const isAnswered = response?.selected_option_id !== null
        const isFlagged = response?.is_flagged
        const isCurrent = originalIndex === currentIndex

        return (
          <button
            key={question.id}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors",
              isCurrent
                ? "bg-primary text-primary-foreground"
                : isAnswered
                  ? "bg-primary/20 text-primary hover:bg-primary/30"
                  : "bg-muted text-muted-foreground hover:bg-muted-foreground/10",
              isFlagged && !isCurrent && "ring-2 ring-yellow-400",
            )}
            onClick={() => onQuestionClick(originalIndex)}
          >
            {showOnlyFlagged ? originalIndex + 1 : filteredIndex + 1}
          </button>
        )
      })}
    </div>
  )
}
