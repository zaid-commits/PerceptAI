import React from "react"
import { SignIn } from "@clerk/clerk-react"
import { Card, CardContent } from "@/components/ui/card"

const AuthPage: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <main className="flex-1 flex items-center justify-center w-full">
                <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
                    <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
                        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                            Welcome to PerceptAI
                        </h1>
                        <p className="max-w-[700px] text-lg text-muted-foreground">
                            Explore our powerful tools and personalized dashboard.
                        </p>
                    </div>
                    <Card className="w-full max-w-md flex align-center justify-center">
                        <CardContent className="pt-6">
                            <SignIn />
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    )
}

export default AuthPage
