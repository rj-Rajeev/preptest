"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Icons } from "@/components/icons"
import type { Question, Topic } from "@/types"
import { createQuestion, updateQuestion } from "@/lib/question-actions"

const optionSchema = z.object({
  id: z.string().optional(),
  option_text: z.string().min(1, { message: "Option text is required." }),
  is_correct: z.boolean().default(false),
})

const questionFormSchema = z.object({
  question_text: z.string().min(3, {
    message: "Question text must be at least 3 characters.",
  }),
  question_type: z.enum(["multiple_choice", "true_false", "fill_blank", "essay"], {
    required_error: "Please select a question type.",
  }),
  difficulty_level: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level.",
  }),
  points: z.coerce.number().min(1, { message: "Points must be at least 1." }),
  explanation: z.string().optional(),
  topic_ids: z.array(z.string()).optional(),
  options: z
    .array(optionSchema)
    .min(2, { message: "At least 2 options are required." })
    .refine((options) => options.some((option) => option.is_correct), {
      message: "At least one option must be marked as correct.",
    }),
})

type QuestionFormValues = z.infer<typeof questionFormSchema>

interface QuestionFormProps {
  testId: string
  topics: Topic[]
  question?: Question
  onSuccess?: () => void
}

export function QuestionForm({ testId, topics, question, onSuccess }: QuestionFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(question?.image_url || null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const defaultValues: Partial<QuestionFormValues> = {
    question_text: question?.question_text || "",
    question_type: question?.question_type || "multiple_choice",
    difficulty_level: question?.difficulty_level || "medium",
    points: question?.points || 1,
    explanation: question?.explanation || "",
    topic_ids: question?.topics?.map((topic) => topic.id) || [],
    options: question?.options?.map((option) => ({
      id: option.id,
      option_text: option.option_text,
      is_correct: option.is_correct,
    })) || [
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
    ],
  }

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues,
  })

  const questionType = form.watch("question_type")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImageUrl(null)
  }

  async function onSubmit(data: QuestionFormValues) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      // Add question data
      formData.append("test_id", testId)
      formData.append("question_text", data.question_text)
      formData.append("question_type", data.question_type)
      formData.append("difficulty_level", data.difficulty_level)
      formData.append("points", data.points.toString())
      if (data.explanation) formData.append("explanation", data.explanation)
      if (data.topic_ids) formData.append("topic_ids", JSON.stringify(data.topic_ids))
      formData.append("options", JSON.stringify(data.options))

      // Add image if available
      if (imageFile) {
        formData.append("image", imageFile)
      } else if (imageUrl === null && question?.image_url) {
        formData.append("remove_image", "true")
      }

      if (question) {
        formData.append("id", question.id)
        await updateQuestion(formData)
        toast({
          title: "Question updated",
          description: "Your question has been updated successfully.",
        })
      } else {
        await createQuestion(formData)
        toast({
          title: "Question created",
          description: "Your question has been created successfully.",
        })
        form.reset(defaultValues)
        setImageFile(null)
        setImageUrl(null)
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push(`/admin/tests/${testId}/questions`)
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="question_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter question text" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="question_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                    <SelectItem value="true_false">True/False</SelectItem>
                    <SelectItem value="fill_blank">Fill in the Blank</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>Question Image (Optional)</FormLabel>
          <div className="mt-2 space-y-4">
            {imageUrl && (
              <div className="relative w-full max-w-md">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="Question image"
                  width={400}
                  height={300}
                  className="rounded-md border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </div>
            )}
            {!imageUrl && (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Icons.image className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 2MB)</p>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="topic_ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topics</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {topics.map((topic) => (
                  <div key={topic.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`topic-${topic.id}`}
                      checked={field.value?.includes(topic.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), topic.id])
                        } else {
                          field.onChange(field.value?.filter((id) => id !== topic.id) || [])
                        }
                      }}
                    />
                    <label
                      htmlFor={`topic-${topic.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {topic.name}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <FormLabel>Options</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const options = form.getValues("options") || []
                form.setValue("options", [...options, { option_text: "", is_correct: false }])
              }}
            >
              <Icons.add className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>

          {form.formState.errors.options?.message && (
            <p className="text-sm font-medium text-destructive mb-2">{form.formState.errors.options.message}</p>
          )}

          {questionType === "true_false" ? (
            <div className="space-y-4">
              {["True", "False"].map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-md">
                  <Checkbox
                    id={`option-${index}`}
                    checked={form.getValues(`options.${index}.is_correct`)}
                    onCheckedChange={(checked) => {
                      // For true/false, only one can be correct
                      const options = form.getValues("options").map((opt, i) => ({
                        ...opt,
                        is_correct: i === index ? !!checked : false,
                      }))
                      form.setValue("options", options)
                    }}
                  />
                  <div className="flex-1">
                    <label htmlFor={`option-${index}`} className="text-sm font-medium">
                      {option}
                    </label>
                    <Input type="hidden" {...form.register(`options.${index}.option_text`)} value={option} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {form.getValues("options")?.map((_, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-md">
                  <Checkbox
                    id={`option-${index}`}
                    checked={form.getValues(`options.${index}.is_correct`)}
                    onCheckedChange={(checked) => {
                      form.setValue(`options.${index}.is_correct`, !!checked)
                    }}
                  />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`options.${index}.option_text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter option text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.getValues("options").length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const options = form.getValues("options")
                        form.setValue(
                          "options",
                          options.filter((_, i) => i !== index),
                        )
                      }}
                    >
                      <Icons.trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explanation (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter explanation for the correct answer" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>This will be shown to users after they answer the question.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.push(`/admin/tests/${testId}/questions`)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {question ? "Update Question" : "Create Question"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
