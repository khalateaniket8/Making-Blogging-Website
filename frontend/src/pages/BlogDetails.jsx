
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Pencil,
  Trash2,
  AlertCircle,
  Loader2,
  BookOpen,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LikeButton from '../components/LikeButton'
import BookmarkButton from '../components/BookmarkButton'
import ShareButton from '../components/ShareButton'
import CopyLinkButton from '../components/CopyLinkButton'
import CommentSection from '../components/CommentSection'
import ReadingProgress from '../components/ReadingProgress'
import BackToTop from '../components/BackToTop'
import { blogService } from '../services/blogService'

function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await blogService.getBlogById(id)

      setBlog(res.data.data)
    } catch (error) {
      console.error(error)

      setError(
        error.response?.data?.message ||
          'Failed to load blog. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this blog? This action cannot be undone.'
    )

    if (!confirmDelete) return

    try {
      setDeleting(true)

      await blogService.deleteBlog(id)

      navigate('/dashboard')
    } catch (error) {
      console.error(error)

      alert(
        error.response?.data?.message ||
          'Failed to delete blog. Please try again.'
      )
    } finally {
      setDeleting(false)
    }
  }

  const calculateReadingTime = (content) => {
    if (!content) return 1

    const words = content.trim().split(/\s+/).length

    return Math.max(1, Math.ceil(words / 200))
  }

  const formatDate = (date) => {
    if (!date) return 'Recently'

    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const isOwner = () => {
    if (!blog || !user) return false

    const blogAuthorId =
      typeof blog.author === 'object'
        ? blog.author?._id
        : blog.author

    return blogAuthorId === user._id
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50">
          <div className="text-center">
            <Loader2
              size={42}
              className="mx-auto animate-spin text-orange-700"
            />

            <p className="mt-4 font-medium text-stone-600">
              Loading your story...
            </p>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertCircle size={32} />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-stone-900">
              Blog not found
            </h1>

            <p className="mt-3 text-stone-600">
              {error || 'This blog may have been deleted or does not exist.'}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
              >
                Go to Dashboard
              </button>

              <button
                onClick={fetchBlog}
                className="rounded-xl border border-stone-300 px-5 py-3 font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <ReadingProgress />

      <Navbar />

      <main className="min-h-screen bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">

          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 font-semibold text-orange-700 transition hover:gap-3"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </button>

          {/* Blog Header */}
          <article className="mt-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">

            {/* Changed black background to orange */}
            <div className="bg-orange-600 p-7 sm:p-10">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700">
                  <BookOpen size={16} />
                  BLOG STORY
                </span>

                {isOwner() && (
                  <div className="flex gap-3">

                    <button
                      onClick={() => navigate(`/edit-blog/${blog._id}`)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-semibold text-stone-900 transition hover:bg-stone-100"
                    >
                      <Pencil size={17} />
                      Edit
                    </button>

                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 size={17} />

                      {deleting ? 'Deleting...' : 'Delete'}
                    </button>

                  </div>
                )}
              </div>

              <h1 className="mt-10 text-4xl font-bold leading-tight text-white sm:text-5xl">
                {blog.title}
              </h1>

              <div className="mt-8 flex flex-col gap-4 border-t border-white/30 pt-6 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-bold text-orange-700">
                    {blog.author?.name
                      ? blog.author.name.charAt(0).toUpperCase()
                      : 'U'}
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      {blog.author?.name || 'Unknown Author'}
                    </p>

                    <p className="text-sm text-orange-100">
                      Author
                    </p>
                  </div>

                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-orange-100">

                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(blog.createdAt)}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {calculateReadingTime(blog.content)} min read
                  </span>

                </div>

              </div>
            </div>

            {/* Blog Content */}
            <div className="p-7 sm:p-10">

              <div className="prose prose-stone max-w-none">

                <p className="whitespace-pre-line text-lg leading-8 text-stone-700">
                  {blog.content}
                </p>

              </div>

              {/* Blog Actions */}
              <div className="mt-10 flex flex-wrap gap-3 border-t border-stone-200 pt-6">

                <LikeButton />

                <BookmarkButton />

                <ShareButton title={blog.title} />

                <CopyLinkButton />

              </div>

              {/* Comments */}
              <CommentSection />

            </div>
          </article>

          {/* Bottom Actions */}
          <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                <User size={20} />
              </div>

              <div>

                <p className="font-semibold text-stone-900">
                  Enjoyed this story?
                </p>

                <p className="text-sm text-stone-500">
                  Explore more stories on BlogSphere.
                </p>

              </div>

            </div>

            {/* Changed black button to orange */}
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              Explore Blogs

              <ArrowLeft
                size={18}
                className="rotate-180"
              />
            </button>

          </section>
        </div>
      </main>

      <Footer />

      <BackToTop />
    </>
  )
}

export default BlogDetails



