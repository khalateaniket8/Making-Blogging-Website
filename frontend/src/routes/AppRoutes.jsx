import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import BlogList from '../pages/BlogList'
import BlogDetails from '../pages/BlogDetails'

import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

import Dashboard from '../pages/Dashboard'
import MyBlogs from '../pages/MyBlogs'
import CreateBlog from '../pages/CreateBlog'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'

import AdminDashboard from '../pages/AdminDashboard'
import AdminUsers from '../pages/AdminUsers'
import AdminBlogs from '../pages/AdminBlogs'

function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* User Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-blogs" element={<MyBlogs />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />

      {/* Admin Panel */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/blogs" element={<AdminBlogs />} />
    </Routes>
  )
}

export default AppRoutes