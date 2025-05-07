"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import type { ExamCategory, Test } from "@/types"
import { createTest, updateTest } from "@/lib/test-actions"

const testFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  exam_category_id: z.string({
    required_error: "Please select an exam category.",
  }),
  duration_minutes: z.coerce.number().min(1, { message: "Duration must be at least 1 minute." }),
  difficulty_level: z.enum(["beginner", "intermediate", "advanced", "expert"], {
    required_error: "Please select a difficulty level.",
  }),
  passing_percentage: z.coerce
    .number()
    .min(1, { message: "Passing percentage must be at least 1%." })
    .max(100, { message: "Passing percentage cannot exceed 100%." }),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
})

type TestFormValues = z.infer<typeof testFormSchema>

interface TestFormProps {
  examCategories: ExamCategory[]
  test?: Test
}

export function TestForm({ examCategories, test }: TestFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues: Partial<TestFormValues> = {
    title: test?.title || "",
    description: test?.description || "",
    exam_category_id: test?.exam_category_id || "",
    duration_minutes: test?.duration_minutes || 60,
    difficulty_level: test?.difficulty_level || "intermediate",
    passing_percentage: test?.passing_percentage || 70,
    is_featured: test?.is_featured || false,
    is_published: test?.is_published || false,
  }

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testFormSchema),
    defaultValues,
  })

  async function onSubmit(data: TestFormValues) {
    setIsSubmitting(true)

    try {
      if (test) {
        await updateTest({
          id: test.id,
          ...data,
        })
        toast({
          title: "Test updated",
          description: "Your test has been updated successfully.",
        })
      } else {
        const newTest = await createTest(data)
        toast({
          title: "Test created",
          description: "Your test has been created successfully.",
        })
        router.push(`/admin/tests/${newTest.id}/questions`)
        return
      }

      router.push("/admin/tests")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save test. Please try again.",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter test title" {...field} />
              </FormControl>
              <FormDescription>The title of your test as it will appear to users.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter test description" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>A brief description of what this test covers.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="exam_category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exam category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {examCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>The exam category this test belongs to.</FormDescription>
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
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The difficulty level of this test.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormDescription>The time limit for completing this test.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passing_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passing Percentage</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={100} {...field} />
                </FormControl>
                <FormDescription>The minimum percentage required to pass this test.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="is_featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured Test</FormLabel>
                  <FormDescription>Feature this test on the homepage and in recommendations.</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Published</FormLabel>
                  <FormDescription>Make this test available to users.</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/tests")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {test ? "Update Test" : "Create Test"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
