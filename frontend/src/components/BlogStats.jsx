
import { FileText, Search } from 'lucide-react'

function BlogStats({ totalBlogs = 0, filteredBlogs = 0 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <FileText size={22} />
          </div>

          <div>
            <p className="text-sm text-stone-500">Total Blogs</p>
            <h3 className="text-2xl font-bold text-stone-900">
              {totalBlogs}
            </h3>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <Search size={22} />
          </div>

          <div>
            <p className="text-sm text-stone-500">Search Results</p>
            <h3 className="text-2xl font-bold text-stone-900">
              {filteredBlogs}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogStats

