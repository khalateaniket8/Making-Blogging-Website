export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  bio?: string
  profileImage?: string
}

export interface Category {
  _id: string
  name: string
  slug: string
}

export interface Blog {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: string
  author: { _id: string; name: string; profileImage?: string }
  category: { _id: string; name: string; slug: string }
  tags: string[]
  status: 'DRAFT' | 'PUBLISHED'
  likes: number
  views: number
  createdAt: string
}

export interface Comment {
  _id: string
  content: string
  user: { _id: string; name: string; profileImage?: string }
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}