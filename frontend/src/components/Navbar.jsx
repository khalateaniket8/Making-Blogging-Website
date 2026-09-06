
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  PenLine,
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  Plus,
} from 'lucide-react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    setMenuOpen(false)
    navigate('/login')
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-orange-50 text-orange-700'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-[73px] max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-bold text-stone-900"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-700 text-white shadow-sm">
            <PenLine size={20} />
          </span>

          <span>
            Blog<span className="text-orange-700">Sphere</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClass}>
            Explore
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/create-blog"
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
              >
                Write
              </NavLink>

              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-xl bg-stone-100 px-3 py-2 lg:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-700 text-xs font-bold text-white">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <span className="max-w-[120px] truncate text-sm font-medium text-stone-700">
                  {user.name || 'User'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 text-stone-700 transition hover:bg-stone-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="mx-auto max-w-6xl space-y-2">

            <NavLink
              to="/"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard size={17} />
                Explore Blogs
              </span>
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/create-blog"
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  <span className="flex items-center gap-2">
                    <Plus size={17} />
                    Write a Blog
                  </span>
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  <span className="flex items-center gap-2">
                    <User size={17} />
                    Profile
                  </span>
                </NavLink>

                <div className="my-3 border-t border-stone-200" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="my-3 border-t border-stone-200" />

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block rounded-xl border border-stone-300 px-4 py-3 text-center text-sm font-semibold text-stone-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block rounded-xl bg-stone-900 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
