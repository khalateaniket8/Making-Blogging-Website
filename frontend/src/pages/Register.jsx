
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  User,
  Mail,
  Lock,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import { authService } from '../services/authService'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)

      const res = await authService.register(
        name.trim(),
        email.trim(),
        password
      )

      const data = res.data

      // Backend token return करत असेल तर save करा
      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      // Backend user return करत असेल तर save करा
      if (data.user) {
        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        )
      }

      navigate('/dashboard')
    } catch (error) {
      console.error(error)

      setError(
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      )
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
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-700 text-white">
                <UserPlus size={26} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
                Join BlogSphere
              </p>

              <h1 className="mt-3 text-3xl font-bold text-stone-900">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Start writing, sharing and discovering amazing stories.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {error && (
                <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle size={20} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 py-3 pl-12 pr-12 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-orange-700"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 py-3 pl-12 pr-12 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-orange-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <UserPlus size={19} />

                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-stone-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-orange-700 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Register
