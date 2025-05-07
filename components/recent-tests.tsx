"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useSession } from "next-auth/react"

export function RecentTests() {
  const { data: session } = useSession()
  const [recentTests, setRecentTests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentTests() {
      if (!session?.user?.id) return

      setIsLoading(true)

      try {
        const { data } = await supabase\
          .from("user
