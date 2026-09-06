
import { useState } from 'react'
import { Heart } from 'lucide-react'

function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
      setLiked(false)
    } else {
      setLikes(likes + 1)
      setLiked(true)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-medium transition ${
        liked
          ? 'border-red-200 bg-red-50 text-red-600'
          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
      }`}
    >
      <Heart
        size={18}
        fill={liked ? 'currentColor' : 'none'}
      />

      {likes} {likes === 1 ? 'Like' : 'Likes'}
    </button>
  )
}

export default LikeButton
