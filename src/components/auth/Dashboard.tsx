import React from "react"
import { Header } from "./Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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
              {/* Add dashboard content here */}
              <p>Dashboard content coming soon...</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

export default Dashboard

