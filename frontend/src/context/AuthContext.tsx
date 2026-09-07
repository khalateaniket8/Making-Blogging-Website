import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { authService } from '../services/authService'
import { User } from '../types'

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')

    if (stored) {
      setUser(JSON.parse(stored))
    }

    setLoading(false)
  }, [])

  const persistSession = (token: string, userData: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const login = async (
    email: string,
    password: string
  ): Promise<void> => {
    const res = await authService.login(email, password)

    persistSession(
      res.data.data.token,
      res.data.data.user
    )
  }

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const res = await authService.register(
      name,
      email,
      password
    )

    persistSession(
      res.data.data.token,
      res.data.data.user
    )
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return ctx
}