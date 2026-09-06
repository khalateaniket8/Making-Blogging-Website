
import { Link } from 'react-router-dom'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

type Author = {
  name?: string
}

type Blog = {
  _id?: string
  id?: string
  title?: string
  content?: string
  description?: string
  author?: Author | string
  createdAt?: string
  updatedAt?: string
  date?: string
}

type BlogCardProps = {
  blog: Blog
}

function BlogCard({ blog }: BlogCardProps) {
  if (!blog) {
    return null
  }

  const formatDate = (date?: string) => {
    if (!date) return 'Recently'

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) {
      return 'Recently'
    }

    return formattedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getReadingTime = (content?: string) => {
    if (!content || typeof content !== 'string') {
      return 1
    }

    const words = content
      .trim()
      .split(/\s+/)
      .filter(Boolean).length

    return Math.max(1, Math.ceil(words / 200))
  }

  const title = blog.title || 'Untitled Blog'

  const blogContent =
    blog.content ||
    blog.description ||
    'No content available'

  const authorName =
    (typeof blog.author === 'object' && blog.author?.name) ||
    (typeof blog.author === 'string' && blog.author) ||
    'BlogSphere Author'

  const blogDate =
    blog.createdAt ||
    blog.date ||
    blog.updatedAt

  const blogId =
    blog._id ||
    blog.id

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-2 bg-orange-700" />

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
            BLOG
          </span>

          <span className="flex items-center gap-1 text-xs text-stone-500">
            <Clock size={14} />
            {getReadingTime(blogContent)} min read
          </span>
        </div>

        <h2 className="mt-5 text-xl font-bold text-stone-900 transition group-hover:text-orange-700">
          {title}
        </h2>

        <p className="mt-3 leading-7 text-stone-600">
          {blogContent}
        </p>

        <div className="mt-6 space-y-3 border-t border-stone-100 pt-5">
          <div className="flex items-center gap-2 text-sm text-stone-600">
            <User size={16} className="text-orange-700" />

            <span className="font-medium">
              {authorName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Calendar size={16} />

            <span>
              {formatDate(blogDate)}
            </span>
          </div>
        </div>

        {blogId ? (
          <Link
            to={`/blog/${blogId}`}
            className="mt-6 flex items-center justify-between rounded-xl bg-stone-900 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            <span>Read Full Story</span>

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 flex w-full cursor-not-allowed items-center justify-between rounded-xl bg-stone-400 px-4 py-3 font-semibold text-white"
          >
            <span>Read Full Story</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </article>
  )
}

export default BlogCard


