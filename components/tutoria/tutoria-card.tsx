interface TutoriaCardProps {
  title: string
  tutorCount: number
}

export function TutoriaCard({ title, tutorCount }: TutoriaCardProps) {
  return (
    <div className="flex-shrink-0 w-28">
      <div className="w-full aspect-square bg-gray-100 rounded-lg border border-gray-200 mb-2" />
      <p className="text-sm font-medium truncate">{title}</p>
      <p className="text-xs text-gray-500">{tutorCount} tutores</p>
    </div>
  )
}
