import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TestimonialCardProps {
  name: string
  exam: string
  score: string
  quote: string
  imageSrc: string
}

export default function TestimonialCard({ name, exam, score, quote, imageSrc }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-20 w-20 rounded-full overflow-hidden mb-4">
            <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200">
              {exam}
            </Badge>
            <Badge className="bg-teal-600">Score: {score}</Badge>
          </div>
          <p className="text-gray-600 italic">"{quote}"</p>
        </div>
      </CardContent>
    </Card>
  )
}
