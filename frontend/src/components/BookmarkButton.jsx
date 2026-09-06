
import { useState } from 'react'
import { Bookmark } from 'lucide-react'

function BookmarkButton() {
  const [bookmarked, setBookmarked] = useState(false)

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  return (
    <button
      type="button"
      onClick={handleBookmark}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-medium transition ${
        bookmarked
          ? 'border-orange-200 bg-orange-50 text-orange-700'
          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
      }`}
    >
      <Bookmark
        size={18}
        fill={bookmarked ? 'currentColor' : 'none'}
      />

      {bookmarked ? 'Saved' : 'Save Blog'}
    </button>
  )
}

export default BookmarkButton
