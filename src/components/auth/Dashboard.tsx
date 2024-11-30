import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Section1/Navbar/Navbar"
import { useUser } from "@clerk/clerk-react"

const Dashboard: React.FC = () => {
    const { user } = useUser()

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                    <div className="flex max-w-[980px] flex-col items-start gap-2">
                        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                            Dashboard
                        </h1>
                        <p className="max-w-[700px] text-lg text-muted-foreground">
                            Manage your account and explore PerceptAI's powerful tools.
                        </p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to Your Dashboard</CardTitle>
                            <CardDescription>
                                Here you can manage your projects and access various features.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user ? (
                                <div>
                                    <p><strong>Name:</strong> {user.fullName}</p>
                                    <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
                                    {/* Add more user details as needed */}
                                </div>
                            ) : (
                                <p>Loading user details...</p>
                            )}
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    )
}

export default Dashboard
