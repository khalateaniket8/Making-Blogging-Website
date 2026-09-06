
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)

    // Backend password reset API नंतर येथे जोडू
    setTimeout(() => {
      setMessage(
        'If an account exists with this email, password reset instructions have been sent.'
      )
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-10">

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-orange-700"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>

            <div className="mt-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-700 text-white shadow-lg">
                <Mail size={26} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
                Password Recovery
              </p>

              <h1 className="mt-3 text-3xl font-bold text-stone-900">
                Forgot Password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Enter your registered email address and we'll help you reset your password.
              </p>
            </div>

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle size={20} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                <CheckCircle size={20} className="mt-0.5 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-stone-900 py-3.5 font-semibold text-white shadow-lg transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? 'Sending...'
                  : 'Send Reset Instructions'}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-stone-600">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-semibold text-orange-700 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ForgotPassword
