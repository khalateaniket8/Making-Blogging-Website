const Blog = require('../models/Blog')

// ================= CREATE BLOG =================
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      })
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user.id,
    })

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    })
  } catch (error) {
    console.error('CREATE BLOG ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to create blog',
    })
  }
}

// ================= GET ALL BLOGS =================
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    })
  } catch (error) {
    console.error('GET BLOGS ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
    })
  }
}

// ================= GET SINGLE BLOG =================
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email')

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: blog,
    })
  } catch (error) {
    console.error('GET SINGLE BLOG ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
    })
  }
}

// ================= UPDATE BLOG =================
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      })
    }

    // फक्त ज्याने Blog तयार केला आहे तोच Edit करू शकतो
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this blog',
      })
    }

    blog.title = title || blog.title
    blog.content = content || blog.content

    await blog.save()

    return res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    })
  } catch (error) {
    console.error('UPDATE BLOG ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to update blog',
    })
  }
}

// ================= DELETE BLOG =================
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      })
    }

    // फक्त Author स्वतःचा Blog delete करू शकतो
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this blog',
      })
    }

    await blog.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    })
  } catch (error) {
    console.error('DELETE BLOG ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to delete blog',
    })
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
}