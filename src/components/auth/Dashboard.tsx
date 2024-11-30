import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Section1/Navbar/Navbar";
import { useUser } from "@clerk/clerk-react";

interface User {
    fullName: string;
    primaryEmailAddress?: {
        emailAddress: string;
    };
    createdAt: string;
    lastActiveAt: string;
    publicMetadata?: {
        role?: string;
    };
}

const UserDetails: React.FC<{ user: User }> = ({ user }) => (
    <div>
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Last Active:</strong> {new Date(user.lastActiveAt).toLocaleDateString()}</p>
        <p><strong>Role:</strong> {user.publicMetadata?.role ?? "User"}</p>
    </div>
);

const FeatureCard: React.FC<{ title: string, description: string, content: string }> = ({ title, description, content }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{content}</p>
        </CardContent>
    </Card>
);

const Dashboard: React.FC = () => {
    const { user } = useUser() as { user: User | null };

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-black text-white">
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
                            {user ? <UserDetails user={user} /> : <p>Loading user details...</p>}
                        </CardContent>
                    </Card>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            title="Project Management"
                            description="Manage your projects efficiently."
                            content="Access all your projects and manage them from one place."
                        />
                        <FeatureCard
                            title="Analytics"
                            description="View detailed analytics."
                            content="Get insights into your project's performance."
                        />
                        <FeatureCard
                            title="Settings"
                            description="Customize your experience."
                            content="Adjust your preferences and account settings."
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
