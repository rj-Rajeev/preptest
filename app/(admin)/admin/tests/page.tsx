import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TestsTable } from "@/components/tests-table"
import { getTests } from "@/lib/test-actions"

export const metadata: Metadata = {
  title: "Tests | Admin Dashboard",
  description: "Manage tests and exams",
}

export default async function TestsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "admin") {
    redirect("/login")
  }

  const tests = await getTests()

  return (
    <DashboardShell>
      <DashboardHeader heading="Tests" text="Manage your tests and exams.">
        <Button asChild>
          <Link href="/admin/tests/new">Create Test</Link>
        </Button>
      </DashboardHeader>
      <TestsTable tests={tests} />
    </DashboardShell>
  )
}
