import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Exam Prep Pro",
  description: "Login to your Exam Prep Pro account",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
