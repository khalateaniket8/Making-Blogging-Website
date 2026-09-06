const express = require('express')
const router = express.Router()

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController')

const authMiddleware = require('../middleware/authMiddleware')

// ================= GET ALL BLOGS =================
router.get('/', getAllBlogs)

// ================= GET SINGLE BLOG =================
router.get('/:id', getBlogById)

// ================= CREATE BLOG =================
router.post('/', authMiddleware, createBlog)

// ================= UPDATE BLOG =================
router.put('/:id', authMiddleware, updateBlog)

// ================= DELETE BLOG =================
router.delete('/:id', authMiddleware, deleteBlog)

module.exports = router