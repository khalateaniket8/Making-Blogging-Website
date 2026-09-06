import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar'

function AdminBlogs() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Why slow software is a feature, not a bug',
      author: 'Priya Nair',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Designing for people who skim',
      author: 'Amit Rao',
      status: 'Published',
    },
    {
      id: 3,
      title: 'On finishing things',
      author: 'Aniket Khalate',
      status: 'Draft',
    },
  ])

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-bold">
          Blogs
        </h1>

        <p className="mt-2 text-stone-600">
          Manage all blogs published on BlogSphere.
        </p>

        <div className="mt-10 space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col justify-between gap-4 rounded-lg border border-stone-200 bg-white p-6 md:flex-row md:items-center"
            >
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    blog.status === 'Published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {blog.status}
                </span>

                <h2 className="mt-3 text-xl font-bold">
                  {blog.title}
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                  By {blog.author}
                </p>
              </div>

              <button
                onClick={() => deleteBlog(blog.id)}
                className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminBlogs