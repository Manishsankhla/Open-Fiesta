'use client'

import { createContext, useContext } from 'react'

// No-auth provider - users can access chat immediately without authentication
interface AuthContextType {
  user: null
  session: null
  loading: false
  signInWithProvider: (provider: 'google' | 'github') => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value: AuthContextType = {
    user: null,
    session: null,
    loading: false,
    signInWithProvider: async () => {
      // No-op - authentication not required
    },
    signOut: async () => {
      // No-op - authentication not required
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
