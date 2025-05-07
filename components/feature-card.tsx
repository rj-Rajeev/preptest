import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-teal-300">
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">{icon}</div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </CardContent>
    </Card>
  )
}
