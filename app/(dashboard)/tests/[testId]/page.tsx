import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { TestInterface } from "@/components/test-interface"
import { getTestById } from "@/lib/test-actions"

interface TestPageProps {
  params: {
    testId: string
  }
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
  const test = await getTestById(params.testId)

  if (!test) {
    return {
      title: "Test Not Found",
    }
  }

  return {
    title: `${test.title} | ExamPrepPro`,
    description: test.description || "Take your exam preparation test",
  }
}

export default async function TestPage({ params }: TestPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const test = await getTestById(params.testId)

  if (!test) {
    notFound()
  }

  return <TestInterface test={test} userId={user.id} />
}
