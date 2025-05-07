"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import type { TestResults } from "@/types"

interface TestResultsDetailsProps {
  results: TestResults
}

export function TestResultsDetails({ results }: TestResultsDetailsProps) {
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect">("all")

  const filteredResponses = results.responses.filter((response) => {
    if (filter === "all") return true
    if (filter === "correct") return response.is_correct
    if (filter === "incorrect") return !response.is_correct
    return true
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Question Analysis</CardTitle>
          <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="correct">Correct</TabsTrigger>
              <TabsTrigger value="incorrect">Incorrect</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="space-y-4">
          {filteredResponses.map((response, index) => {
            const question = results.test.questions.find((q) => q.id === response.question_id)
            if (!question) return null

            const selectedOption = question.options.find((o) => o.id === response.selected_option_id)
            const correctOption = question.options.find((o) => o.is_correct)

            return (
              <AccordionItem key={response.id} value={response.id} className="border rounded-lg">
                <AccordionTrigger className="px-4">
                  <div className="flex items-center gap-3 text-left">
                    <Badge
                      variant={response.is_correct ? "success" : "destructive"}
                      className="h-6 w-6 p-0 flex items-center justify-center"
                    >
                      {response.is_correct ? <Icons.check className="h-3 w-3" /> : <Icons.close className="h-3 w-3" />}
                    </Badge>
                    <span className="font-medium">Question {index + 1}</span>
                    {response.is_flagged && (
                      <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        Flagged
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Question:</h4>
                      <p>{question.question_text}</p>
                      {question.image_url && (
                        <div className="mt-2">
                          <Image
                            src={question.image_url || "/placeholder.svg"}
                            alt="Question image"
                            width={300}
                            height={200}
                            className="rounded-md"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Your Answer:</h4>
                      <div
                        className={`rounded-md border p-3 ${
                          response.is_correct ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
                        }`}
                      >
                        {selectedOption ? (
                          <p>{selectedOption.option_text}</p>
                        ) : (
                          <p className="text-muted-foreground italic">No answer provided</p>
                        )}
                      </div>
                    </div>

                    {!response.is_correct && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Correct Answer:</h4>
                        <div className="rounded-md border border-green-300 bg-green-50 p-3">
                          <p>{correctOption?.option_text}</p>
                        </div>
                      </div>
                    )}

                    {question.explanation && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Explanation:</h4>
                        <div className="rounded-md border bg-muted/30 p-3">
                          <p>{question.explanation}</p>
                        </div>
                      </div>
                    )}

                    {question.topics && question.topics.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Topics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {question.topics.map((topic) => (
                            <Badge key={topic.id} variant="outline">
                              {topic.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {filteredResponses.length === 0 && (
          <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
            No questions match the selected filter.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
