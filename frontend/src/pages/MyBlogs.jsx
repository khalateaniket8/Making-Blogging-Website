import { Link } from 'react-router-dom'
import { Edit, Trash2, Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const blogs = [
  {
    id: 1,
    title: 'Why slow software is a feature, not a bug',
    category: 'Technology',
    status: 'Published',
    date: 'Sep 1, 2026',
  },
  {
    id: 2,
    title: 'Designing for people who skim',
    category: 'Design',
    status: 'Published',
    date: 'Aug 28, 2026',
  },
  {
    id: 3,
    title: 'On finishing things',
    category: 'Personal',
    status: 'Draft',
    date: 'Aug 20, 2026',
  },
]

function MyBlogs() {
  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              My Blogs
            </h1>

            <p className="mt-2 text-stone-600">
              Manage everything you have written.
            </p>
          </div>

          <Link
            to="/create-blog"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-stone-900 px-5 py-3 text-sm font-medium text-white"
          >
            <Plus size={18} />
            New Blog
          </Link>
        </div>

        <div className="mt-10 space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col gap-5 rounded-lg border border-stone-200 bg-white p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-orange-700">
                    {blog.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      blog.status === 'Published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold">
                  {blog.title}
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                  {blog.date}
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-md border border-stone-300 px-4 py-2 text-sm hover:bg-stone-100">
                  <Edit size={17} />
                  Edit
                </button>

                <button className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <Trash2 size={17} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default MyBlogs