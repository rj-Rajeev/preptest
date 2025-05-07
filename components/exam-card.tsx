import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface ExamCardProps {
  name: string
  icon: string
  testCount: number
}

export default function ExamCard({ name, icon, testCount }: ExamCardProps) {
  return (
    <Link href="#">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-teal-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-2xl">{icon}</div>
            <div>
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm text-gray-500">{testCount} mock tests</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
