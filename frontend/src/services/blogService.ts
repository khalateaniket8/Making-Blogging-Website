import api from './api'

export const blogService = {
  // GET ALL BLOGS
  getAllBlogs: () => {
    return api.get('/blogs')
  },

  // GET SINGLE BLOG
  getBlogById: (id: string) => {
    return api.get(`/blogs/${id}`)
  },

  // CREATE BLOG
  createBlog: (title: string, content: string) => {
    return api.post('/blogs', {
      title,
      content,
    })
  },

  // UPDATE BLOG
  updateBlog: (id: string, title: string, content: string) => {
    return api.put(`/blogs/${id}`, {
      title,
      content,
    })
  },

  // DELETE BLOG
  deleteBlog: (id: string) => {
    return api.delete(`/blogs/${id}`)
  },
}