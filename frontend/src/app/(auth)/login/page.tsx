'use client'

import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/providers/AuthProvider"
import { useState } from "react"

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const {login} = useAuth();

    const handleLogin = async (email: string, password: string) => {
        try {
            setError(null);
            await login({email, password});
        } catch (err) {
            setError('Invalid credentials')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error ? (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                ) : (
                    <LoginForm onSubmit={handleLogin} />
                )}
            </div>
        </div>
    )
}