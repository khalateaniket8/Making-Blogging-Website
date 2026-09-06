import { Users, FileText, Eye, Heart } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar'

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-stone-600">
          Manage BlogSphere from one place.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <Users size={25} className="text-stone-500" />

            <p className="mt-5 text-3xl font-bold">1,248</p>

            <p className="mt-2 text-sm text-stone-500">
              Total Users
            </p>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <FileText size={25} className="text-stone-500" />

            <p className="mt-5 text-3xl font-bold">856</p>

            <p className="mt-2 text-sm text-stone-500">
              Total Blogs
            </p>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <Eye size={25} className="text-stone-500" />

            <p className="mt-5 text-3xl font-bold">48.2K</p>

            <p className="mt-2 text-sm text-stone-500">
              Total Views
            </p>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <Heart size={25} className="text-stone-500" />

            <p className="mt-5 text-3xl font-bold">8.4K</p>

            <p className="mt-2 text-sm text-stone-500">
              Total Likes
            </p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">
            Recent Activity
          </h2>

          <div className="mt-5 rounded-lg border border-stone-200 bg-white">
            <div className="border-b border-stone-200 p-5">
              <p className="font-medium">
                New user registered
              </p>

              <p className="mt-1 text-sm text-stone-500">
                Aniket joined BlogSphere · Just now
              </p>
            </div>

            <div className="border-b border-stone-200 p-5">
              <p className="font-medium">
                New blog published
              </p>

              <p className="mt-1 text-sm text-stone-500">
                "Why slow software is a feature" · 10 minutes ago
              </p>
            </div>

            <div className="p-5">
              <p className="font-medium">
                Blog updated
              </p>

              <p className="mt-1 text-sm text-stone-500">
                "Designing for people who skim" · 1 hour ago
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard