import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UserStats } from "@/components/user-stats"
// import { RecentTests } from "@/components/recent-tests"
// import { RecommendedTests } from "@/components/recommended-tests"
import { StudyStreak } from "@/components/study-streak"
// import { UpcomingExams } from "@/components/upcoming-exams"

export const metadata: Metadata = {
  title: "Dashboard | ExamPrepPro",
  description: "Manage your exam preparation and track your progress",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome back! Track your progress and continue your exam preparation."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <UserStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StudyStreak className="lg:col-span-1" />
        {/* <UpcomingExams className="lg:col-span-2" /> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {/* <RecentTests /> */}
        {/* <RecommendedTests /> */}
      </div>
    </DashboardShell>
  )
}
