import type { LucideIcon } from "lucide-react"

/**
 * Icon type
 */
export type IconType = LucideIcon

/**
 * Chart data point
 */
export interface ChartDataPoint {
  name: string
  value: number
}

/**
 * Progress data
 */
export interface ProgressData {
  label: string
  value: number
  total: number
  percentage: number
}

/**
 * Study streak data
 */
export interface StreakData {
  currentStreak: number
  lastStudyDate: string | null
  studyDates: string[]
}

/**
 * Calendar day
 */
export interface CalendarDay {
  date: string
  isStudyDay: boolean
}

/**
 * Topic performance
 */
export interface TopicPerformance {
  name: string
  total: number
  correct: number
  percentage: number
}

/**
 * User stats
 */
export interface UserStats {
  testsCompleted: number
  averageScore: number
  totalTimeSpent: number
  streakDays: number
}
