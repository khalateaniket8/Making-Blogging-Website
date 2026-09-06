import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = () => {
    const settings = {
      emailNotifications,
      publicProfile,
      darkMode,
    }

    localStorage.setItem('settings', JSON.stringify(settings))

    setMessage('Settings saved successfully!')
  }

  const Toggle = ({ checked, onChange }) => {
    return (
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? 'bg-stone-900' : 'bg-stone-300'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="mt-2 text-stone-600">
            Control your BlogSphere preferences.
          </p>

          {message && (
            <div className="mt-6 rounded-md bg-green-50 p-4 text-sm text-green-700">
              {message}
            </div>
          )}

          <div className="mt-10 space-y-5">
            <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-6">
              <div>
                <h3 className="font-bold">
                  Email Notifications
                </h3>

                <p className="mt-1 text-sm text-stone-500">
                  Receive updates about your blogs and comments.
                </p>
              </div>

              <Toggle
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-6">
              <div>
                <h3 className="font-bold">
                  Public Profile
                </h3>

                <p className="mt-1 text-sm text-stone-500">
                  Allow other readers to view your profile.
                </p>
              </div>

              <Toggle
                checked={publicProfile}
                onChange={setPublicProfile}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-6">
              <div>
                <h3 className="font-bold">
                  Dark Mode
                </h3>

                <p className="mt-1 text-sm text-stone-500">
                  Use a darker appearance for the dashboard.
                </p>
              </div>

              <Toggle
                checked={darkMode}
                onChange={setDarkMode}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-8 rounded-md bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-700"
          >
            Save Settings
          </button>
        </div>
      </main>
    </div>
  )
}

export default Settings