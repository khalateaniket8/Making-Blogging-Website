import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`

const register = (name, email, password) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  })
}

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  })
}

export const authService = {
  register,
  login,
}
