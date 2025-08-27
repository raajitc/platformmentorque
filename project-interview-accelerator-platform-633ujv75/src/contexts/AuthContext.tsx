import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Predefined users for testing (5-6 users)
const DEMO_USERS = [
  { id: '1', name: 'John Smith', email: 'john@mentorque.com', password: 'password123' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@mentorque.com', password: 'password123' },
  { id: '3', name: 'Mike Chen', email: 'mike@mentorque.com', password: 'password123' },
  { id: '4', name: 'Emily Davis', email: 'emily@mentorque.com', password: 'password123' },
  { id: '5', name: 'Alex Rodriguez', email: 'alex@mentorque.com', password: 'password123' },
  { id: '6', name: 'Lisa Wang', email: 'lisa@mentorque.com', password: 'password123' }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already signed in
    const savedUser = localStorage.getItem('mentorque_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const userWithoutPassword = { id: foundUser.id, name: foundUser.name, email: foundUser.email }
      setUser(userWithoutPassword)
      localStorage.setItem('mentorque_user', JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('mentorque_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }