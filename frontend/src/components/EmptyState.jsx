
import { FileText, Search } from 'lucide-react'

function EmptyState({ searchTerm }) {
  return (
    <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
        {searchTerm ? <Search size={30} /> : <FileText size={30} />}
      </div>

      <h2 className="mt-5 text-2xl font-bold text-stone-900">
        {searchTerm ? 'No blogs found' : 'No blogs yet'}
      </h2>

      <p className="mx-auto mt-3 max-w-md leading-7 text-stone-600">
        {searchTerm
          ? `We couldn't find any blog matching "${searchTerm}". Try another search.`
          : 'There are no blogs available yet. Be the first one to write and share your story.'}
      </p>
    </div>
  )
}

export default EmptyState
