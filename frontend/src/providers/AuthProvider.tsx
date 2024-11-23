'use client'

import { authService } from "@/lib/api";
import { AuthContextType, LoginCredentials, RegisterCredentials, User } from "@/types/auth"
import { useRouter } from "next/router";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {

        }
    }, [])

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials.email, credentials.password)
            const {user, token} = response.data;

            localStorage.setItem('token', token)
            setUser(user)
            router.push('/subjects')
        } catch (error) {
            throw error;
        }
    }

    const register = async (credentials: RegisterCredentials) => {
        try {
            const response = await authService.register(
                credentials.name,
                credentials.email,
                credentials.password
            )
            const {user, token} = response.data;

            localStorage.setItem('token', token)
            setUser(user);
            router.push('/subjects')
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null)
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{user, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}