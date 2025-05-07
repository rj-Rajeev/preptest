import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const passwordResetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const profileUpdateSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  bio: z.string().max(500, { message: "Bio must be less than 500 characters" }).optional(),
  study_goal: z.string().max(200, { message: "Study goal must be less than 200 characters" }).optional(),
  target_exam: z.string().uuid().optional().nullable(),
  target_score: z.coerce.number().min(0).optional().nullable(),
  target_date: z.string().optional().nullable(),
  daily_study_goal_minutes: z.coerce.number().min(0).max(1440).optional().nullable(),
})

export const testFormSchema = z.object({
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

export const optionSchema = z.object({
  id: z.string().optional(),
  option_text: z.string().min(1, { message: "Option text is required." }),
  is_correct: z.boolean().default(false),
})

export const questionFormSchema = z.object({
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
