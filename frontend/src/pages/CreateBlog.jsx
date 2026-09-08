
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PenLine, ArrowLeft, Send, AlertCircle, FileText } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogService } from '../services/blogService'

function CreateBlog() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || !content.trim()) {
      setError('Please enter both title and content.')
      return
    }

    try {
      setLoading(true)

      await blogService.createBlog(title.trim(), content.trim())

      navigate('/dashboard')
    } catch (error) {
      console.error(error)

      setError(
        error.response?.data?.message ||
        'Failed to create blog. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 font-medium text-orange-700 hover:gap-3"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              <PenLine size={16} />
              Create New Story
            </div>

            <h1 className="mt-5 text-4xl font-bold text-stone-900">
              Share your idea with the world.
            </h1>

            <p className="mt-3 text-stone-600">
              Write something meaningful and publish it for the BlogSphere community.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10"
          >
            {error && (
              <div className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <div className="mb-2 flex justify-between">
                <label className="font-semibold text-stone-800">
                  Blog Title
                </label>

                <span className="text-xs text-stone-400">
                  {title.length}/150
                </span>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength="150"
                placeholder="Enter an interesting title..."
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div className="mt-7">
              <div className="mb-2 flex justify-between">
                <label className="font-semibold text-stone-800">
                  Your Story
                </label>

                <span className="text-xs text-stone-400">
                  {content.length} characters
                </span>
              </div>

              <textarea
                rows="14"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story..."
                className="w-full resize-none rounded-xl border border-stone-300 bg-white px-4 py-4 leading-7 outline-none placeholder:text-stone-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div className="mt-6 flex gap-3 rounded-xl bg-orange-50 p-4">
              <div className="rounded-lg bg-orange-100 p-2 text-orange-700">
                <FileText size={18} />
              </div>

              <p className="text-sm leading-6 text-stone-600">
                Review your blog carefully before publishing. Once published,
                you can edit it later from your blog page.
              </p>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="rounded-xl border border-stone-300 px-6 py-3 font-semibold text-stone-700 hover:bg-stone-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-700 px-6 py-3 font-semibold text-white hover:bg-orange-800 disabled:opacity-60"
              >
                <Send size={18} />
                {loading ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default CreateBlog

