import React from "react"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton } from "@clerk/clerk-react"

const Auth: React.FC = () => {

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
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg"
            >
                <SignInButton/>
            </Button>
            <Button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg"
            >
                <SignUpButton/>
            </Button>
            </div>
        </div>
    )
}

export default Auth
