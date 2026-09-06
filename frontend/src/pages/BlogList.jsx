import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'

const blogs = [
  {
    id: 1,
    category: 'Design',
    title: 'Designing for people who skim',
    excerpt: 'Most readers scan before they commit.',
    author: 'Amit Rao',
    date: 'Sep 2',
  },
  {
    id: 2,
    category: 'Culture',
    title: 'The quiet return of the personal blog',
    excerpt: 'Newsletters had their moment. Writers are coming home.',
    author: 'Leah Osei',
    date: 'Aug 29',
  },
  {
    id: 3,
    category: 'Technology',
    title: 'Building BlogSphere: the first six weeks',
    excerpt: 'An honest log of what we got wrong first.',
    author: 'Dev Sharma',
    date: 'Aug 24',
  },
  {
    id: 4,
    category: 'Travel',
    title: 'Three weeks without a plan',
    excerpt: 'Notes from a trip with no itinerary.',
    author: 'Meera Iyer',
    date: 'Aug 20',
  },
  {
    id: 5,
    category: 'Food',
    title: 'What a Nashik thali taught me about pacing',
    excerpt: 'A slow-food lesson from a fast city.',
    author: 'Rohan Patil',
    date: 'Aug 18',
  },
  {
    id: 6,
    category: 'Personal',
    title: 'On finishing things',
    excerpt: 'Half the drafts I write never get published. This one did.',
    author: 'Priya Nair',
    date: 'Aug 15',
  },
]

function BlogList() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || blog.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-10 text-5xl font-bold">All Blogs</h1>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col gap-4 border-b border-stone-200 pb-8 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-stone-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-stone-700"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-stone-300 bg-white px-4 py-3 outline-none"
          >
            <option value="All">All Categories</option>
            <option>Technology</option>
            <option>Culture</option>
            <option>Design</option>
            <option>Travel</option>
            <option>Food</option>
            <option>Personal</option>
          </select>
        </div>

        {/* Blog List */}
        <div className="divide-y divide-stone-200">
          {filteredBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              className="block py-8 transition hover:opacity-70"
            >
              <p className="mb-3 text-sm font-semibold text-orange-700">
                {blog.category}
              </p>

              <h2 className="text-2xl font-bold md:text-3xl">
                {blog.title}
              </h2>

              <p className="mt-3 max-w-2xl text-stone-600">
                {blog.excerpt}
              </p>

              <p className="mt-5 text-sm text-stone-500">
                {blog.author} · {blog.date}
              </p>
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <p className="py-10 text-center text-stone-500">
            No blogs found.
          </p>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-4 text-sm">
          <button className="rounded border border-stone-300 px-4 py-2">
            Prev
          </button>

          <button className="rounded bg-stone-900 px-4 py-2 text-white">
            1
          </button>

          <button className="rounded border border-stone-300 px-4 py-2">
            2
          </button>

          <button className="rounded border border-stone-300 px-4 py-2">
            3
          </button>

          <button className="rounded border border-stone-300 px-4 py-2">
            Next
          </button>
        </div>
      </main>
    </>
  )
}

export default BlogList