/**
 * Base model with common fields
 */
export interface BaseModel {
  id: string
  created_at: string
  updated_at: string
}

/**
 * Exam category model
 */
export interface ExamCategory extends BaseModel {
  name: string
  description: string | null
  icon: string | null
  slug: string
}

/**
 * Test model
 */
export interface Test extends BaseModel {
  exam_category_id: string
  title: string
  description: string | null
  duration_minutes: number
  difficulty_level: "beginner" | "intermediate" | "advanced" | "expert"
  passing_percentage: number | null
  is_featured: boolean | null
  is_published: boolean | null
  image_url: string | null

  // Relations
  exam_category?: ExamCategory
  questions?: Question[]
}

/**
 * Question model
 */
export interface Question extends BaseModel {
  test_id: string
  question_text: string
  question_type: "multiple_choice" | "true_false" | "fill_blank" | "essay"
  difficulty_level: "easy" | "medium" | "hard"
  points: number | null
  explanation: string | null
  image_url: string | null

  // Relations
  options?: Option[]
  topics?: Topic[]
}

/**
 * Option model for multiple choice questions
 */
export interface Option extends BaseModel {
  question_id: string
  option_text: string
  is_correct: boolean
}

/**
 * Topic model for categorizing questions
 */
export interface Topic extends BaseModel {
  exam_category_id: string
  name: string
  description: string | null
}

/**
 * User test attempt model
 */
export interface UserTest extends BaseModel {
  user_id: string
  test_id: string
  status: "in_progress" | "completed" | "abandoned"
  score: number | null
  percentage: number | null
  start_time: string
  end_time: string | null
  time_spent_seconds: number | null

  // Relations
  test?: Test
  responses?: UserResponse[]
}

/**
 * User response to a question
 */
export interface UserResponse extends BaseModel {
  user_test_id: string
  question_id: string
  selected_option_id: string | null
  text_response: string | null
  is_correct: boolean | null
  is_flagged: boolean | null
  time_spent_seconds: number | null

  // Relations
  question?: Question
}

/**
 * User progress tracking
 */
export interface UserProgress extends BaseModel {
  user_id: string
  exam_category_id: string
  tests_completed: number | null
  average_score: number | null
  total_time_spent_seconds: number | null
  strengths: string[] | null
  weaknesses: string[] | null
  last_activity_date: string

  // Relations
  exam_category?: ExamCategory
}

/**
 * Badge for gamification
 */
export interface Badge extends BaseModel {
  name: string
  description: string | null
  icon: string | null
  criteria: string | null
}

/**
 * User earned badge
 */
export interface UserBadge extends BaseModel {
  user_id: string
  badge_id: string
  earned_at: string

  // Relations
  badge?: Badge
}

/**
 * User profile with additional information
 */
export interface UserProfile extends BaseModel {
  id: string // References auth.users.id
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  study_goal: string | null
  target_exam: string | null
  target_score: number | null
  target_date: string | null
  daily_study_goal_minutes: number | null
  streak_days: number | null
  last_study_date: string | null
  role: string | null

  // Relations
  target_exam_category?: ExamCategory
}

/**
 * Test results with detailed information
 */
export interface TestResults {
  id: string
  user_id: string
  test_id: string
  status: "in_progress" | "completed" | "abandoned"
  score: number | null
  percentage: number | null
  start_time: string
  end_time: string | null
  time_spent_seconds: number | null

  // Relations
  test: Test
  responses: UserResponse[]
}
