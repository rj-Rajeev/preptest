"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import type { TestResults } from "@/types"

interface TestResultsChartProps {
  results: TestResults
}

export function TestResultsChart({ results }: TestResultsChartProps) {
  const { score, test } = results
  const totalQuestions = test.questions.length
  const correctAnswers = score || 0
  const incorrectAnswers = totalQuestions - correctAnswers

  const data = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: incorrectAnswers },
  ]

  const COLORS = ["#10b981", "#ef4444"]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Performance Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ChartContainer
            config={{
              correct: {
                label: "Correct",
                color: "hsl(var(--chart-1))",
              },
              incorrect: {
                label: "Incorrect",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-2 flex justify-center gap-4">
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm">
                  {entry.name}: {entry.value} ({((entry.value / totalQuestions) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
