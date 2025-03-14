import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Auth: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
                    Welcome to PerceptAI
                </h1>
                <p className="mt-4 max-w-lg text-lg text-gray-400">
                    Your gateway to AI-powered tools and a personalized dashboard.
                </p>
            </header>
            <div className="flex flex-col md:flex-row gap-6">
                <Button
                    onClick={() => navigate("/auth/login")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg"
                >
                    Log In
                </Button>
                <Button
                    onClick={() => navigate("/auth/signup")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg"
                >
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default Auth
