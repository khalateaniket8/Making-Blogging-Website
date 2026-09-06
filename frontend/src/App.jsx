
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

import Dashboard from './pages/Dashboard'
import CreateBlog from './pages/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import EditBlog from './pages/EditBlog'
import Profile from './pages/Profile'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* ================= PROTECTED ROUTES ================= */}
      <Route element={<ProtectedRoute />}>

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Create Blog */}
        <Route
          path="/create-blog"
          element={<CreateBlog />}
        />

        {/* Blog Details */}
        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />

        {/* Edit Blog */}
        <Route
          path="/edit-blog/:id"
          element={<EditBlog />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

      </Route>

      {/* ================= 404 PAGE ================= */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
            <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xl">
              <h1 className="text-7xl font-bold text-orange-700">
                404
              </h1>

              <h2 className="mt-4 text-2xl font-bold text-stone-900">
                Page Not Found
              </h2>

              <p className="mt-3 text-stone-600">
                The page you are looking for does not exist.
              </p>
            </div>
          </div>
        }
      />
    </Routes>
  )
}

export default App




