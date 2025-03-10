import React from "react"
import { SignIn } from "@clerk/clerk-react"
import { Card, CardContent } from "@/components/ui/card"

const Login: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <Card className="w-full max-w-md flex align-center justify-center">
                <CardContent className="pt-6">
                    <SignIn />
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
