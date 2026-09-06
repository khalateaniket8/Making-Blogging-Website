
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { authService } from '../services/authService'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    // Validation
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }

    try {
      setLoading(true)

      // Backend API ला Login Request
      const response = await authService.login(
        email.trim(),
        password
      )

      console.log('Login Response:', response.data)

      const data = response.data

      // Different backend response formats handle करण्यासाठी
      const token =
        data.token ||
        data.data?.token

      const user =
        data.user ||
        data.data?.user

      // Token मिळाला नाही तर error
      if (!token) {
        setError('Login failed: Token not received from server.')
        return
      }

      // Token save
      localStorage.setItem('token', token)

      // User save
      if (user) {
        localStorage.setItem(
          'user',
          JSON.stringify(user)
        )
      }

      // Dashboard वर जा
      navigate('/dashboard')

    } catch (error) {
      console.error('Login Error:', error)

      if (error.response) {
        setError(
          error.response.data?.message ||
          error.response.data?.error ||
          'Invalid email or password.'
        )
      } else if (error.request) {
        setError(
          'Cannot connect to backend. Please make sure backend is running on port 5000.'
        )
      } else {
        setError(
          'Something went wrong. Please try again.'
        )
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-4 py-12">
        <div className="w-full max-w-md">

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-10">

            {/* Header */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-700 text-white shadow-lg">
                <LogIn size={26} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
                Welcome Back
              </p>

              <h1 className="mt-3 text-3xl font-bold text-stone-900">
                Log in to BlogSphere
              </h1>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Continue reading, writing and sharing your ideas.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-stone-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-orange-700 transition hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-stone-500 transition hover:bg-stone-100 hover:text-orange-700"
                    aria-label="Show or hide password"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 font-semibold text-white shadow-lg transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogIn size={19} />

                {loading
                  ? 'Logging in...'
                  : 'Log In'}
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-7 text-center text-sm text-stone-600">
              Don't have an account?{' '}

              <Link
                to="/register"
                className="font-semibold text-orange-700 hover:underline"
              >
                Create one
              </Link>
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Login

