import React from "react"
import { SignUp } from "@clerk/clerk-react"
import { Card, CardContent } from "@/components/ui/card"

const Signup: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <Card className="w-full max-w-md flex align-center justify-center">
                <CardContent className="pt-6">
                    <SignUp />
                </CardContent>
            </Card>
        </div>
    )
}

export default Signup
