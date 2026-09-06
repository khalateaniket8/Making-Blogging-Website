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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})