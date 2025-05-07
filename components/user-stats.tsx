"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { supabase } from "@/lib/supabase"
import { useSession } from "next-auth/react"

export function UserStats() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    testsCompleted: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    streakDays: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      if (!session?.user?.id) return

      setIsLoading(true)

      try {
        // Get tests completed and average score
        const { data: userTests } = await supabase
          .from("user_tests")
          .select("score, percentage, time_spent_seconds")
          .eq("user_id", session.user.id)
          .eq("status", "completed")

        // Get user profile for streak
        const { data: userProfile } = await supabase
          .from("user_profiles")
          .select("streak_days")
          .eq("id", session.user.id)
          .single()

        const testsCompleted = userTests?.length || 0
        const averageScore =
          testsCompleted > 0 ? userTests!.reduce((sum, test) => sum + (test.percentage || 0), 0) / testsCompleted : 0
        const totalTimeSpent = userTests?.reduce((sum, test) => sum + (test.time_spent_seconds || 0), 0) || 0

        setStats({
          testsCompleted,
          averageScore,
          totalTimeSpent,
          streakDays: userProfile?.streak_days || 0,
        })
      } catch (error) {
        console.error("Error fetching user stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [session])

  // Format time spent
  const formatTimeSpent = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
          <Icons.test className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-12">
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <div className="text-2xl font-bold">{stats.testsCompleted}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Icons.chart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-12">
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <div className="text-2xl font-bold">{stats.averageScore.toFixed(1)}%</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Study Time</CardTitle>
          <Icons.clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-12">
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <div className="text-2xl font-bold">{formatTimeSpent(stats.totalTimeSpent)}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
          <Icons.calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-12">
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center">
              <div className="text-2xl font-bold">{stats.streakDays} days</div>
              {stats.streakDays >= 3 && <div className="ml-2 text-2xl">🔥</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
