
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PenLine, LogOut, LayoutDashboard } from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogSearch from '../components/BlogSearch'
import BlogCard from '../components/BlogCard'
import EmptyState from '../components/EmptyState'
import LoadingSpinner from '../components/LoadingSpinner'

function Dashboard() {
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const userData = localStorage.getItem('user')

  const user = userData
    ? JSON.parse(userData)
    : {}

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:5000/api/blogs',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to load blogs'
          )
        }

        if (Array.isArray(data)) {
          setBlogs(data)
        } else if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs)
        } else if (Array.isArray(data.data)) {
          setBlogs(data.data)
        } else {
          setBlogs([])
        }
      } catch (err) {
        console.error('Dashboard Error:', err)

        setError(
          err.message ||
          'Unable to load blogs. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [token])

  const filteredBlogs = blogs.filter((blog) =>
    (blog.title || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    navigate('/login')
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">

          {/* Dashboard Header */}
          <div className="flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 sm:flex-row sm:items-center">

            <div>
              <div className="flex items-center gap-2 text-orange-700">
                <LayoutDashboard size={20} />

                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                  Dashboard
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
                Welcome, {user.name || 'User'} 👋
              </h1>

              <p className="mt-2 text-stone-600">
                Manage your blogs and share your ideas with the world.
              </p>

              {user.email && (
                <p className="mt-1 text-sm text-stone-500">
                  {user.email}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/create-blog"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
              >
                <PenLine size={18} />
                Create New Blog
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* All Blogs */}
          <section className="py-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
                  Community
                </p>

                <h2 className="mt-2 text-3xl font-bold text-stone-900">
                  All Blogs
                </h2>

                <p className="mt-2 text-stone-600">
                  Explore stories and ideas from BlogSphere.
                </p>
              </div>

              <p className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                {filteredBlogs.length} Blog
                {filteredBlogs.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Search */}
            <div className="mt-7">
              <BlogSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Blog Cards */}
            <div className="mt-8">
              {loading ? (
                <LoadingSpinner text="Loading blogs..." />
              ) : error ? null : filteredBlogs.length === 0 ? (
                <EmptyState searchTerm={searchTerm} />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBlogs.map((blog) => (
                    <BlogCard
                      key={blog._id || blog.id}
                      blog={blog}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Dashboard





