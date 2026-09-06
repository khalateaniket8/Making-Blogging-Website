
import { useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Calendar,
  LogOut,
  LayoutDashboard,
  PenLine,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Profile() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    navigate('/login')
  }

  if (!user) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-4">
          <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
              <User size={30} />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-stone-900">
              Please Log In
            </h1>

            <p className="mt-3 text-stone-600">
              You need to log in to view your profile.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="mt-6 rounded-xl bg-stone-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              Go to Login
            </button>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  const userName = user.name || 'BlogSphere User'
  const userEmail = user.email || 'No email available'

  const firstLetter = userName.charAt(0).toUpperCase()

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
      })
    : 'Recently joined'

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-73px)] bg-stone-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
              My Account
            </p>

            <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
              Profile
            </h1>

            <p className="mt-2 text-stone-600">
              Manage and view your BlogSphere account information.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* Profile Card */}
            <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm lg:col-span-1">
              <div className="h-28 bg-gradient-to-r from-stone-900 to-orange-700" />

              <div className="px-6 pb-7">
                <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-orange-700 text-3xl font-bold text-white shadow-lg">
                  {firstLetter}
                </div>

                <h2 className="mt-5 text-2xl font-bold text-stone-900">
                  {userName}
                </h2>

                <p className="mt-1 break-all text-sm text-stone-500">
                  {userEmail}
                </p>

                <div className="mt-6 border-t border-stone-200 pt-5">
                  <button
                    onClick={() => navigate('/create-blog')}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
                  >
                    <PenLine size={18} />
                    Write a Blog
                  </button>

                  <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300 px-4 py-3 font-semibold text-stone-700 transition hover:bg-stone-100"
                  >
                    <LayoutDashboard size={18} />
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </section>

            {/* Account Details */}
            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
              <h2 className="text-xl font-bold text-stone-900">
                Account Information
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Your registered BlogSphere account details.
              </p>

              <div className="mt-7 space-y-4">

                <div className="flex items-center gap-4 rounded-2xl bg-stone-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                    <User size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Full Name
                    </p>

                    <p className="mt-1 truncate font-semibold text-stone-900">
                      {userName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-stone-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                    <Mail size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Email Address
                    </p>

                    <p className="mt-1 break-all font-semibold text-stone-900">
                      {userEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-stone-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                    <Calendar size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Member Since
                    </p>

                    <p className="mt-1 font-semibold text-stone-900">
                      {joinDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <div className="mt-8 border-t border-stone-200 pt-6">
                <h3 className="font-bold text-stone-900">
                  Account Actions
                </h3>

                <p className="mt-1 text-sm text-stone-500">
                  Log out securely from your BlogSphere account.
                </p>

                <button
                  onClick={handleLogout}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Profile



