import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TestResultsSummary } from "@/components/test-results-summary"
import { TestResultsDetails } from "@/components/test-results-details"
import { TestResultsChart } from "@/components/test-results-chart"
import { TestResultsStrengths } from "@/components/test-results-strengths"
import { getUserTestResults } from "@/lib/test-actions"

interface TestResultsPageProps {
  params: {
    testId: string
  }
}

export async function generateMetadata({ params }: TestResultsPageProps): Promise<Metadata> {
  return {
    title: "Test Results | ExamPrepPro",
    description: "View your test results and performance analysis",
  }
}

export default async function TestResultsPage({ params }: TestResultsPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const results = await getUserTestResults(params.testId, user.id)

  if (!results) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Test Results"
        text={`${results.test.title} - Completed on ${new Date(results.end_time).toLocaleDateString()}`}
      >
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/tests/${results.test.id}`}>Retake Test</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <TestResultsSummary results={results} />
          <TestResultsChart results={results} />
        </div>
        <TestResultsStrengths results={results} />
        <TestResultsDetails results={results} />
      </div>
    </DashboardShell>
  )
}
