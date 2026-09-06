
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  PenLine,
  BookOpen,
  Users,
  Sparkles,
  Clock,
  User,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogService } from '../services/blogService'

const Home = () => {
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await blogService.getAllBlogs()

      setBlogs(res.data.data || [])
    } catch (error) {
      console.error(error)
      setError('Unable to load blogs right now.')
    } finally {
      setLoading(false)
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
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-stone-50">

        {/* Hero Section */}
        <section className="relative border-b border-stone-200">
          <div className="mx-auto grid min-h-[600px] max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                <Sparkles size={16} />
                A place for your ideas
              </div>

              <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight text-stone-900 sm:text-6xl">
                Write your story.
                <br />
                <span className="text-orange-700">
                  Share your voice.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
                BlogSphere is a simple and powerful place to write,
                publish and discover ideas from people around the world.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={user ? '/create-blog' : '/register'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 font-semibold text-white transition hover:bg-stone-700"
                >
                  <PenLine size={18} />
                  {user ? 'Write a Blog' : 'Start Writing'}
                </Link>

                <button
                  onClick={() =>
                    document
                      .getElementById('featured-blogs')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 font-semibold text-stone-700 transition hover:bg-stone-100"
                >
                  Explore Blogs
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative">
              <div className="rounded-3xl bg-stone-900 p-6 shadow-2xl sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white">
                    <BookOpen size={24} />
                  </div>

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-stone-300">
                    BLOGSPHERE
                  </span>
                </div>

                <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
                  Start your journey
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Every great idea deserves to be shared.
                </h2>

                <p className="mt-5 leading-7 text-stone-300">
                  Create meaningful stories, share your knowledge and
                  connect with readers through your words.
                </p>

                <div className="mt-10 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 font-bold text-white">
                      B
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        BlogSphere Community
                      </p>

                      <p className="text-sm text-stone-400">
                        Write. Share. Inspire.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="border-b border-stone-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                <BookOpen size={24} />
              </div>

              <div>
                <p className="text-2xl font-bold text-stone-900">
                  {blogs.length}
                </p>

                <p className="text-sm text-stone-500">
                  Stories published
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-stone-100 p-3 text-stone-700">
                <Users size={24} />
              </div>

              <div>
                <p className="text-2xl font-bold text-stone-900">
                  Community
                </p>

                <p className="text-sm text-stone-500">
                  Connect through ideas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                <Sparkles size={24} />
              </div>

              <div>
                <p className="text-2xl font-bold text-stone-900">
                  Create
                </p>

                <p className="text-sm text-stone-500">
                  Share what matters
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blogs */}
        <section
          id="featured-blogs"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
                Discover
              </p>

              <h2 className="mt-3 text-4xl font-bold text-stone-900">
                Latest stories
              </h2>

              <p className="mt-3 max-w-xl text-stone-600">
                Discover ideas, experiences and stories shared by the
                BlogSphere community.
              </p>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 font-semibold text-orange-700 transition hover:gap-3"
            >
              View all blogs
              <ArrowRight size={18} />
            </button>
          </div>

          {loading && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[300px] animate-pulse rounded-2xl bg-stone-200"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center">
              <PenLine size={35} className="mx-auto text-orange-700" />

              <h3 className="mt-5 text-2xl font-bold text-stone-900">
                Be the first to share a story
              </h3>

              <p className="mt-3 text-stone-600">
                There are no blogs published yet.
              </p>

              <Link
                to={user ? '/create-blog' : '/register'}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-700 px-6 py-3 font-semibold text-white"
              >
                Start Writing
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.slice(0, 6).map((blog) => (
                <article
                  key={blog._id}
                  className="group flex min-h-[330px] flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
                      STORY
                    </span>

                    <span className="text-xs text-stone-400">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-stone-900 group-hover:text-orange-700">
                    {blog.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 leading-7 text-stone-600">
                    {blog.content}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-stone-500">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {blog.author?.name || 'Unknown Author'}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {calculateReadingTime(blog.content)} min read
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      className="inline-flex items-center gap-2 font-semibold text-orange-700"
                    >
                      Read story
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mx-4 mb-16 rounded-3xl bg-orange-700 sm:mx-6">
          <div className="mx-auto max-w-6xl px-6 py-14 text-center sm:py-20">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-200">
              Your story starts here
            </p>

            <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
              Have something interesting to say?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-orange-100">
              Join BlogSphere and let your ideas reach more people.
            </p>

            <Link
              to={user ? '/create-blog' : '/register'}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-stone-900"
            >
              <PenLine size={18} />
              {user ? 'Write Your Next Blog' : 'Create Your Account'}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home

