import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import type { TestResults } from "@/types"

interface TestResultsSummaryProps {
  results: TestResults
}

export function TestResultsSummary({ results }: TestResultsSummaryProps) {
  const { score, percentage, time_spent_seconds, test } = results
  const totalQuestions = test.questions.length
  const correctAnswers = score || 0
  const incorrectAnswers = totalQuestions - correctAnswers

  // Format time spent
  const hours = Math.floor(time_spent_seconds / 3600)
  const minutes = Math.floor((time_spent_seconds % 3600) / 60)
  const seconds = time_spent_seconds % 60
  const formattedTime = `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`

  // Determine if passed
  const passed = percentage >= (test.passing_percentage || 70)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Test Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className={`text-4xl font-bold ${passed ? "text-green-600" : "text-red-600"}`}>
            {percentage.toFixed(1)}%
          </div>
          <div
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {passed ? (
              <>
                <Icons.check className="mr-1 h-4 w-4" />
                Passed
              </>
            ) : (
              <>
                <Icons.close className="mr-1 h-4 w-4" />
                Failed
              </>
            )}
          </div>

          <div className="grid w-full grid-cols-2 gap-4 pt-4">
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground">Correct</span>
              <span className="text-2xl font-bold text-green-600">{correctAnswers}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground">Incorrect</span>
              <span className="text-2xl font-bold text-red-600">{incorrectAnswers}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground">Total Questions</span>
              <span className="text-2xl font-bold">{totalQuestions}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground">Time Spent</span>
              <span className="text-2xl font-bold">{formattedTime}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
