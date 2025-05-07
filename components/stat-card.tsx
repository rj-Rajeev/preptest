interface StatCardProps {
  number: string
  label: string
}

export default function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="text-center p-4">
      <p className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">{number}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  )
}
