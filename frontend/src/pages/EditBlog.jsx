
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Pencil, ArrowLeft, Save, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogService } from '../services/blogService'

function EditBlog() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const res = await blogService.getBlogById(id)
      const blog = res.data.data

      setTitle(blog.title || '')
      setContent(blog.content || '')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load blog')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || !content.trim()) {
      setError('Please enter title and content.')
      return
    }

    try {
      setUpdating(true)

      await blogService.updateBlog(id, title.trim(), content.trim())

      navigate(`/blog/${id}`)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update blog')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-orange-700" />
            <p className="mt-4 text-stone-600">Loading blog...</p>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate(`/blog/${id}`)}
            className="inline-flex items-center gap-2 font-medium text-orange-700"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </button>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              <Pencil size={16} />
              Edit Blog
            </div>

            <h1 className="mt-5 text-4xl font-bold text-stone-900">
              Update your story.
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10"
          >
            {error && (
              <div className="mb-6 flex gap-3 rounded-xl bg-red-50 p-4 text-red-700">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}

            <div>
              <label className="mb-2 block font-semibold">
                Blog Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-orange-600"
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block font-semibold">
                Blog Content
              </label>

              <textarea
                rows="14"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full resize-none rounded-xl border border-stone-300 px-4 py-4 outline-none focus:border-orange-600"
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(`/blog/${id}`)}
                className="rounded-xl border border-stone-300 px-6 py-3 font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-700 px-6 py-3 font-semibold text-white"
              >
                <Save size={18} />
                {updating ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default EditBlog

