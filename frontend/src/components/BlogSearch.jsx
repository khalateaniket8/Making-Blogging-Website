
import { Search, X } from 'lucide-react'

function BlogSearch({ searchTerm, setSearchTerm }) {
  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs by title..."
        className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-12 pr-12 text-stone-800 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-red-500"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}

export default BlogSearch
