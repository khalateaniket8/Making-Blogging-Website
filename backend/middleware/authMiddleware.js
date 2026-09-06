const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    // Token आहे का check करा
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied',
      })
    }

    // "Bearer TOKEN" मधून फक्त TOKEN घेणे
    const token = authHeader.split(' ')[1]

    // Token verify करणे
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // User ID request मध्ये store करणे
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}

module.exports = authMiddleware