import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!password || !confirmPassword) {
      setError('Please fill all fields.')
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

    alert('Password reset successfully!')
    navigate('/login')
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
            New Password
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Reset your password
          </h1>

          <p className="mt-3 text-stone-600">
            Create a new secure password for your account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium">
                New Password
              </label>

              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-stone-300 bg-white px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm New Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-stone-300 bg-white px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-stone-900 py-3 font-medium text-white hover:bg-stone-700"
            >
              Reset Password
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default ResetPassword