import axios from 'axios'

const api = axios.create({
  baseURL: 'https://making-blogging-website-qgs4.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// प्रत्येक request सोबत token पाठवण्यासाठी
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api