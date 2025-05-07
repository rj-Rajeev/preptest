/**
 * API response structure
 */
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  status: number
}

/**
 * Start test request
 */
export interface StartTestRequest {
  test_id: string
  user_id: string
}

/**
 * Start test response
 */
export interface StartTestResponse {
  id: string
  user_id: string
  test_id: string
  status: "in_progress"
  start_time: string
}

/**
 * Save user response request
 */
export interface SaveUserResponseRequest {
  user_test_id: string
  question_id: string
  selected_option_id?: string | null
  text_response?: string | null
  is_flagged?: boolean
}

/**
 * Submit test request
 */
export interface SubmitTestRequest {
  user_test_id: string
  time_spent_seconds: number
}

/**
 * Submit test response
 */
export interface SubmitTestResponse {
  id: string
  score: number
  percentage: number
  status: "completed"
  end_time: string
}

/**
 * Create test request
 */
export interface CreateTestRequest {
  title: string
  description?: string
  exam_category_id: string
  duration_minutes: number
  difficulty_level: "beginner" | "intermediate" | "advanced" | "expert"
  passing_percentage?: number
  is_featured?: boolean
  is_published?: boolean
}

/**
 * Update test request
 */
export interface UpdateTestRequest extends CreateTestRequest {
  id: string
}

/**
 * Create question request
 */
export interface CreateQuestionRequest {
  test_id: string
  question_text: string
  question_type: "multiple_choice" | "true_false" | "fill_blank" | "essay"
  difficulty_level: "easy" | "medium" | "hard"
  points?: number
  explanation?: string
  topic_ids?: string[]
  options: {
    option_text: string
    is_correct: boolean
  }[]
}

/**
 * Update question request
 */
export interface UpdateQuestionRequest extends CreateQuestionRequest {
  id: string
  options: {
    id?: string
    option_text: string
    is_correct: boolean
  }[]
}
