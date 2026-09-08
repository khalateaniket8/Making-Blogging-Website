import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
} from 'lucide-react'

function AdminSidebar() {
  const location = useLocation()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={19} />,
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: <Users size={19} />,
    },
    {
      name: 'Blogs',
      path: '/admin/blogs',
      icon: <FileText size={19} />,
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin')
  }

  return (
    <aside className="w-full border-b border-stone-200 bg-white md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="p-6">
        <Link
          to="/admin"
          className="text-2xl font-bold text-stone-900"
        >
          BlogSphere
        </Link>

        <p className="mt-1 text-sm text-stone-500">
          Admin Panel
        </p>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:block md:space-y-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex min-w-max items-center gap-3 rounded-md px-4 py-3 text-sm transition ${
                active
                  ? 'bg-stone-200 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          )
        })}

        <Link
          to="/"
          onClick={handleLogout}
          className="flex min-w-max items-center gap-3 rounded-md px-4 py-3 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </Link>
      </nav>
    </aside>
  )
}

export default AdminSidebar