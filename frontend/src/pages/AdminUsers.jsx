import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar'

function AdminUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Aniket Khalate',
      email: 'aniket@example.com',
      role: 'User',
    },
    {
      id: 2,
      name: 'Priya Nair',
      email: 'priya@example.com',
      role: 'User',
    },
    {
      id: 3,
      name: 'Amit Rao',
      email: 'amit@example.com',
      role: 'User',
    },
  ])

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <p className="mt-2 text-stone-600">
          Manage registered users.
        </p>

        <div className="mt-10 overflow-x-auto rounded-lg border border-stone-200 bg-white">
          <table className="w-full min-w-[650px] text-left">
            <thead className="border-b border-stone-200 bg-stone-100 text-sm">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-stone-100"
                >
                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4 text-stone-600">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="flex items-center gap-2 text-sm text-red-600 hover:underline"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default AdminUsers