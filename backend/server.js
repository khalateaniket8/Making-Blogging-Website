const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')

dotenv.config()

connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)

// Test Route
app.get('/', (req, res) => {
  res.json({
    message: 'BlogSphere Backend API is running',
  })
})

// Export app for Vercel
module.exports = app