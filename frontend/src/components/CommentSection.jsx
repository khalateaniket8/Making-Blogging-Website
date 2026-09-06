
import { useState } from 'react'
import { MessageCircle, Send, User } from 'lucide-react'

function CommentSection() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!comment.trim()) return

    const newComment = {
      id: Date.now(),
      text: comment,
      author: 'You',
      date: new Date().toLocaleDateString('en-IN'),
    }

    setComments([newComment, ...comments])
    setComment('')
  }

  return (
    <section className="mt-10 border-t border-stone-200 pt-8">
      <div className="flex items-center gap-2">
        <MessageCircle size={22} className="text-orange-700" />

        <h2 className="text-2xl font-bold text-stone-900">
          Comments ({comments.length})
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows="4"
          className="w-full resize-none rounded-xl border border-stone-300 bg-white p-4 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
        />

        <button
          type="submit"
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          <Send size={18} />
          Post Comment
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {comments.length === 0 ? (
          <p className="rounded-xl bg-stone-50 p-5 text-center text-stone-500">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-stone-200 bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                  <User size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-stone-900">
                    {item.author}
                  </h3>

                  <p className="text-xs text-stone-500">
                    {item.date}
                  </p>
                </div>
              </div>

              <p className="mt-4 leading-7 text-stone-600">
                {item.text}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default CommentSection

