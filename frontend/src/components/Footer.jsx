
import { Link } from 'react-router-dom'
import { PenLine, Heart, Github, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-bold text-stone-900"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-700 text-white">
                <PenLine size={21} />
              </span>

              <span>
                Blog<span className="text-orange-700">Sphere</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-stone-600">
              A modern platform to write, publish and share your ideas with
              the world. Every story deserves a place to be heard.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-stone-900">
              Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-stone-600 transition hover:text-orange-700"
              >
                Home
              </Link>

              <Link
                to="/dashboard"
                className="text-sm text-stone-600 transition hover:text-orange-700"
              >
                Explore Blogs
              </Link>

              <Link
                to="/create-blog"
                className="text-sm text-stone-600 transition hover:text-orange-700"
              >
                Write a Blog
              </Link>

              <Link
                to="/profile"
                className="text-sm text-stone-600 transition hover:text-orange-700"
              >
                My Profile
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-stone-900">
              Account
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="text-sm text-stone-600 transition hover:text-orange-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm text-stone-600 transition hover:text-orange-700"
              >
                Create Account
              </Link>

              <Link
                to="/profile"
                className="text-sm text-stone-600 transition hover:text-orange-700"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-5 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          
          <p className="text-sm text-stone-500">
            © {currentYear} BlogSphere. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm text-stone-500">
              Made with
              <Heart size={16} className="fill-current text-red-500" />
              for writers
            </span>

            <a
              href="#"
              className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 hover:text-orange-700"
              aria-label="GitHub"
            >
              <Github size={19} />
            </a>

            <a
              href="mailto:hello@blogsphere.com"
              className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 hover:text-orange-700"
              aria-label="Email"
            >
              <Mail size={19} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
