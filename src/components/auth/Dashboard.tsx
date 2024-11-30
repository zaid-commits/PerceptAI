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
                                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                    <p><strong>Last Active:</strong> {new Date(user.lastActiveAt).toLocaleDateString()}</p>
                                    <p><strong>Role:</strong> {user.publicMetadata.role || "User"}</p>
                                    {/* Add more user details as needed */}
                                </div>
                            ) : (
                                <p>Loading user details...</p>
                            )}
                        </CardContent>
                    </Card>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Management</CardTitle>
                                <CardDescription>Manage your projects efficiently.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Access all your projects and manage them from one place.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Analytics</CardTitle>
                                <CardDescription>View detailed analytics.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Get insights into your project's performance.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>Customize your experience.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Adjust your preferences and account settings.</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Dashboard
