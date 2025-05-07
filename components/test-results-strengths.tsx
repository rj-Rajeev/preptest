import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { TestResults } from "@/types"

interface TestResultsStrengthsProps {
  results: TestResults
}

export function TestResultsStrengths({ results }: TestResultsStrengthsProps) {
  // Group questions by topic and calculate performance
  const topicPerformance = results.responses.reduce(
    (acc, response) => {
      const question = results.test.questions.find((q) => q.id === response.question_id)
      if (!question) return acc

      // Get topics for this question
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

  // Convert to array and sort by performance
  const topicsArray = Object.entries(topicPerformance)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.percentage - a.percentage)

  // Identify strengths and weaknesses
  const strengths = topicsArray.filter((topic) => topic.percentage >= 70)
  const weaknesses = topicsArray.filter((topic) => topic.percentage < 70)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          {strengths.length > 0 ? (
            <div className="space-y-4">
              {strengths.map((topic) => (
                <div key={topic.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{topic.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {topic.correct}/{topic.total} ({topic.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={topic.percentage} className="h-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[100px] items-center justify-center text-center text-sm text-muted-foreground">
              No strengths identified yet. Keep practicing!
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          {weaknesses.length > 0 ? (
            <div className="space-y-4">
              {weaknesses.map((topic) => (
                <div key={topic.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{topic.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {topic.correct}/{topic.total} ({topic.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={topic.percentage} className="h-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[100px] items-center justify-center text-center text-sm text-muted-foreground">
              Great job! No significant weaknesses identified.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
