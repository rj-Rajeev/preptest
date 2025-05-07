"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { supabase } from "@/lib/supabase"
import { useSession } from "next-auth/react"

interface StudyStreakProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StudyStreak({ className, ...props }: StudyStreakProps) {
  const { data: session } = useSession()
  const [streakData, setStreakData] = useState<{
    currentStreak: number
    lastStudyDate: string | null
    studyDates: string[]
  }>({
    currentStreak: 0,
    lastStudyDate: null,
    studyDates: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStreakData() {
      if (!session?.user?.id) return

      setIsLoading(true)

      try {
        // Get user profile for streak info
        const { data: userProfile } = await supabase
          .from("user_profiles")
          .select("streak_days, last_study_date")
          .eq("id", session.user.id)
          .single()

        // Get test completion dates for the last 30 days
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const { data: recentTests } = await supabase
          .from("user_tests")
          .select("end_time")
          .eq("user_id", session.user.id)
          .eq("status", "completed")
          .gte("end_time", thirtyDaysAgo.toISOString())
          .order("end_time", { ascending: false })

        // Extract unique dates
        const studyDates = recentTests ? [...new Set(recentTests.map((test) => test.end_time.split("T")[0]))] : []

        setStreakData({
          currentStreak: userProfile?.streak_days || 0,
          lastStudyDate: userProfile?.last_study_date,
          studyDates,
        })
      } catch (error) {
        console.error("Error fetching streak data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStreakData()
  }, [session])

  // Generate last 30 days for the streak calendar
  const generateCalendarDays = () => {
    const days = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split("T")[0]

      days.push({
        date: dateString,
        isStudyDay: streakData.studyDates.includes(dateString),
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <Card className={className} {...props}>
      <CardHeader className="pb-2">
        <CardTitle>Study Streak</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Icons.spinner className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold flex items-center justify-center">
                  {streakData.currentStreak}
                  {streakData.currentStreak >= 3 && <span className="ml-2">🔥</span>}
                </div>
                <div className="text-sm text-muted-foreground mt-1">days in a row</div>
              </div>
            </div>

            <div className="grid grid-cols-15 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`h-4 w-4 rounded-sm ${day.isStudyDay ? "bg-primary" : "bg-muted"}`}
                  title={`${day.date}${day.isStudyDay ? " - Studied" : ""}`}
                />
              ))}
            </div>

            <div className="text-xs text-center text-muted-foreground">
              {streakData.lastStudyDate
                ? `Last studied on ${new Date(streakData.lastStudyDate).toLocaleDateString()}`
                : "Start studying today to build your streak!"}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
