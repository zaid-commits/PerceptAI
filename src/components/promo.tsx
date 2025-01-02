import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@clerk/clerk-react"

export default function Promo() {
    const { user } = useUser();
    const isAdmin = user?.emailAddresses?.some(email => email.emailAddress === "rakhangezaid10@gmail.com");

    return (
        <div className="min-h-[40vh]  flex items-center justify-center p-4  bg-[#161818]">
            <Card className="w-full max-w-4xl bg-[#161818] border-none">
                <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <p className="text-purple-800 text-sm font-medium">Ready to get started?</p>
                        <h1 className="text-3xl uppercase md:text-5xl font-bold text-white leading-tight ">
                            Join thousands of developers building with PerceptAI.
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button 
                                className="bg-purple-800 hover:bg-purple-900 text-white px-8 py-6 text-lg rounded-lg border-none"
                                size="lg"
                            >
                              <a href="/community">Join Now!</a>
                            </Button>

                            {isAdmin && (
                                <Button 
                                    className="bg-purple-800 hover:bg-purple-900 text-white px-8 py-6 text-lg rounded-lg border-none"
                                    size="lg"
                                >
                                    <a href="/admin">Admin Panel</a>
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
