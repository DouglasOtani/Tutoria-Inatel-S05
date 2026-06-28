import { Search } from "lucide-react"

interface SearchInputProps {
  placeholder?: string
}

export function SearchInput({ placeholder = "Buscar..." }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
    </div>
  )
}
