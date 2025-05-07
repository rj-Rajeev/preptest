import type { User } from "next-auth"

/**
 * Extended user type with additional fields
 */
export interface ExtendedUser extends User {
  id: string
  role: "user" | "admin" | "instructor"
  email: string
  name?: string | null
  image?: string | null
}

/**
 * Authentication form data for login
 */
export interface LoginFormData {
  email: string
  password: string
}

/**
 * Authentication form data for registration
 */
export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

/**
 * Password reset form data
 */
export interface PasswordResetFormData {
  email: string
}

/**
 * New password form data
 */
export interface NewPasswordFormData {
  password: string
  confirmPassword: string
  token: string
}

/**
 * User profile update form data
 */
export interface ProfileUpdateFormData {
  name?: string
  email?: string
  bio?: string
  avatar_url?: string
  study_goal?: string
  target_exam?: string
  target_score?: number
  target_date?: string
  daily_study_goal_minutes?: number
}
