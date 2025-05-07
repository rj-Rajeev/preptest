import type { ReactNode, HTMLAttributes } from "react"
import type { ExamCategory, Test, Question, UserResponse, TestResults, Topic } from "./database"

/**
 * Props for the dashboard shell component
 */
export interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Props for the dashboard header component
 */
export interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: ReactNode
}

/**
 * Props for the user account navigation component
 */
export interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
  user: {
    name: string | null
    email: string | null
    image: string | null
  }
}

/**
 * Props for the user avatar component
 */
export interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: {
    name: string | null
    image: string | null
  }
}

/**
 * Props for the test interface component
 */
export interface TestInterfaceProps {
  test: Test
  userId: string
}

/**
 * Props for the test timer component
 */
export interface TestTimerProps {
  timeRemaining: number
}

/**
 * Props for the question navigation component
 */
export interface QuestionNavigationProps {
  questions: Question[]
  userResponses: UserResponse[]
  currentIndex: number
  onQuestionClick: (index: number) => void
  showOnlyFlagged?: boolean
}

/**
 * Props for the confirm dialog component
 */
export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
}

/**
 * Props for the test results summary component
 */
export interface TestResultsSummaryProps {
  results: TestResults
}

/**
 * Props for the test results chart component
 */
export interface TestResultsChartProps {
  results: TestResults
}

/**
 * Props for the test results strengths component
 */
export interface TestResultsStrengthsProps {
  results: TestResults
}

/**
 * Props for the test results details component
 */
export interface TestResultsDetailsProps {
  results: TestResults
}

/**
 * Props for the tests table component
 */
export interface TestsTableProps {
  tests: Test[]
}

/**
 * Props for the test form component
 */
export interface TestFormProps {
  examCategories: ExamCategory[]
  test?: Test
}

/**
 * Props for the question form component
 */
export interface QuestionFormProps {
  testId: string
  topics: Topic[]
  question?: Question
  onSuccess?: () => void
}

/**
 * Props for the study streak component
 */
export interface StudyStreakProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the recent tests component
 */
export interface RecentTestsProps {
  userId?: string
}

/**
 * Props for the recommended tests component
 */
export interface RecommendedTestsProps {
  userId?: string
}

/**
 * Props for the upcoming exams component
 */
export interface UpcomingExamsProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the testimonial card component
 */
export interface TestimonialCardProps {
  name: string
  exam: string
  score: string
  quote: string
  imageSrc: string
}

/**
 * Props for the exam card component
 */
export interface ExamCardProps {
  name: string
  icon: string
  testCount: number
}

/**
 * Props for the feature card component
 */
export interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

/**
 * Props for the stat card component
 */
export interface StatCardProps {
  number: string
  label: string
}
