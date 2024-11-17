import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Promo() {
    return (
        <div className="min-h-[500px] bg-[#000000] flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl bg-[#000000] border-none">
                <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <p className="text-purple-400 text-sm font-medium">Ready to get started?</p>
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
                            Join thousands of developers building with PerceptAI.
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button 
                                className="bg-purple-800 hover:bg-purple-900 text-white px-8 py-6 text-lg rounded-lg border-none"
                                size="lg"
                            >
                                Join Now!
                            </Button>
                            {/* <Button 
                                variant="outline"
                                className="hover:bg-gray-800 px-8 py-6 text-lg rounded-lg border-none"
                                size="lg"
                            >
                                Talk to 
                            </Button> */}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}