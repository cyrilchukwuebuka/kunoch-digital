'use client';

import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';



import Spinner from '@/modules/common/components/ui/spinner';



import useAlert from '../hooks/use-alert';
import useToggleState from '../hooks/use-toggle-state';
import useGlobalStore, { ActiveUser } from '../store/global-store';


export enum AUTH_VIEW {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
}

export type LoginData = {
  username: string;
  password: string;
}

interface AuthContext {
  isAuthenticated: boolean;
  activeUser: ActiveUser | undefined;
  loading: boolean;
  refreshState: boolean;
  refreshToggle: () => void;
  error: string;
  authView: [AUTH_VIEW, Dispatch<SetStateAction<AUTH_VIEW>>];
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null)

interface AuthProviderProps {
  children?: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const activeUser = useGlobalStore(state => state.activeUser)
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { state, open: openAlert, close, Alert } = useAlert(() => setError(''))
  const authView = useState<AUTH_VIEW>(AUTH_VIEW.LOGIN)
  const [isLoaded, setIsLoaded] = useState(false)
  const { state: refreshState, toggle: refreshToggle } = useToggleState()

  const handleLogin = async (data: LoginData) => {};

  const handleLogout = async () => {
    setIsAuthenticated(false)
  }

  if (!isLoaded)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner color="blue" width={70} height={70} />
      </div>
    )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        activeUser,
        loading,
        error,
        refreshState,
        refreshToggle,
        authView,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}

      <span className="fixed right-3 top-3 z-30">
        <Alert />
      </span>
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }

  return context
}