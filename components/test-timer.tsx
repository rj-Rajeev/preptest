import { Icons } from "@/components/icons"

interface TestTimerProps {
  timeRemaining: number
}

export function TestTimer({ timeRemaining }: TestTimerProps) {
  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)
  const seconds = timeRemaining % 60

  const formattedTime = `${hours > 0 ? `${hours}:` : ""}${
    minutes < 10 && hours > 0 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`

  const isLowTime = timeRemaining < 300 // Less than 5 minutes

  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-3 py-1 ${
        isLowTime ? "animate-pulse border-red-300 bg-red-50 text-red-700" : "border-muted-foreground/20"
      }`}
    >
      <Icons.clock className="h-4 w-4" />
      <span className="font-mono text-sm font-medium">{formattedTime}</span>
    </div>
  )
}
