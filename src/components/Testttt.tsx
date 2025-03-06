import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { Brain, Code, Eye, Github, Globe, Layers, Linkedin, MessageSquare, Search, Share2, Twitter, Users } from 'lucide-react'
import { useState } from "react"

export default function LandingPage() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">PerceptAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-purple-500 transition-colors">Features</a>
            <a href="#community" className="text-sm font-medium hover:text-purple-500 transition-colors">Community</a>
            <a href="#resources" className="text-sm font-medium hover:text-purple-500 transition-colors">Resources</a>
            <a href="#projects" className="text-sm font-medium hover:text-purple-500 transition-colors">Projects</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Log In</Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden border-b border-border">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black">
              <div className="absolute inset-0 opacity-30" style={{ 
                backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%)'
              }}></div>
            </div>
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-purple-600 hover:bg-purple-700">Computer Vision Platform</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Advanced Computer Vision for the Modern Developer
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                PerceptAI empowers developers, researchers, and businesses with cutting-edge computer vision tools and solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Explore Projects
                </Button>
                <Button size="lg" variant="outline">
                  Join the Community
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="features" className="py-20 border-b border-border">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Computer Vision Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Leverage our comprehensive suite of tools to build, deploy, and scale your computer vision applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Brain className="h-10 w-10 text-purple-500" />,
                  title: "AI-Powered Recognition",
                  description: "Advanced object, face, and pattern recognition powered by state-of-the-art neural networks."
                },
                {
                  icon: <Code className="h-10 w-10 text-purple-500" />,
                  title: "Code Generation",
                  description: "Automatically generate optimized OpenCV and TensorFlow code for your specific use cases."
                },
                {
                  icon: <Layers className="h-10 w-10 text-purple-500" />,
                  title: "Model Training",
                  description: "Train and fine-tune custom computer vision models with your own datasets."
                },
                {
                  icon: <Globe className="h-10 w-10 text-purple-500" />,
                  title: "Edge Deployment",
                  description: "Deploy your models to edge devices, cloud, or hybrid environments with ease."
                }
              ].map((feature, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-purple-500 p-0">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Spotlight */}
        <section id="community" className="py-20 border-b border-border">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Spotlight</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join a thriving community of computer vision experts, developers, and enthusiasts.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Avatar key={i} className="h-12 w-12 border-2 border-purple-500">
                        <AvatarImage src={`/placeholder.svg?height=100&width=100&text=User${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View All Contributors</Button>
                </CardFooter>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-purple-500" />
                    Featured Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Facial Emotion Recognition",
                    "Real-time Object Tracking",
                    "Document OCR System"
                  ].map((project, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span>{project}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Explore Projects</Button>
                </CardFooter>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    Recent Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Best practices for model optimization",
                    "Comparing YOLOv8 vs EfficientDet",
                    "Edge deployment challenges"
                  ].map((topic, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span>{topic}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Join the Conversation</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Project Showcase */}
        <section id="projects" className="py-20 border-b border-border">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore innovative computer vision projects built with PerceptAI.
              </p>
            </div>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="object">Object Detection</TabsTrigger>
                  <TabsTrigger value="face">Facial Analysis</TabsTrigger>
                  <TabsTrigger value="ocr">OCR & Text</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Retail Analytics System",
                      description: "Customer tracking and behavior analysis for retail environments",
                      image: "/placeholder.svg?height=300&width=400&text=Retail"
                    },
                    {
                      title: "Medical Imaging Assistant",
                      description: "AI-powered analysis of medical scans and images",
                      image: "/placeholder.svg?height=300&width=400&text=Medical"
                    },
                    {
                      title: "Smart City Traffic Monitor",
                      description: "Real-time traffic analysis and optimization system",
                      image: "/placeholder.svg?height=300&width=400&text=Traffic"
                    },
                    {
                      title: "Document Processing Pipeline",
                      description: "Automated extraction and processing of document data",
                      image: "/placeholder.svg?height=300&width=400&text=Document"
                    },
                    {
                      title: "Agricultural Crop Analysis",
                      description: "Drone-based monitoring and analysis of agricultural fields",
                      image: "/placeholder.svg?height=300&width=400&text=Agriculture"
                    },
                    {
                      title: "Industrial Quality Control",
                      description: "Automated defect detection for manufacturing lines",
                      image: "/placeholder.svg?height=300&width=400&text=Industrial"
                    }
                  ].map((project, index) => (
                    <Card key={index} className="overflow-hidden border-border bg-card">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={project.image || "/placeholder.svg"} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="object" className="mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select the "Object Detection" category to view related projects.</p>
                </div>
              </TabsContent>
              <TabsContent value="face" className="mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select the "Facial Analysis" category to view related projects.</p>
                </div>
              </TabsContent>
              <TabsContent value="ocr" className="mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select the "OCR & Text" category to view related projects.</p>
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-12 text-center">
              <Button className="bg-purple-600 hover:bg-purple-700">Submit Your Project</Button>
            </div>
          </div>
        </section>

        {/* Developer Resources */}
        <section id="resources" className="py-20 border-b border-border">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Developer Resources</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access comprehensive documentation, tutorials, and tools to accelerate your development.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Documentation",
                  description: "Comprehensive guides and API references",
                  icon: <Code className="h-10 w-10 text-purple-500" />
                },
                {
                  title: "Tutorials",
                  description: "Step-by-step guides for common use cases",
                  icon: <Layers className="h-10 w-10 text-purple-500" />
                },
                {
                  title: "Model Zoo",
                  description: "Pre-trained models ready for deployment",
                  icon: <Brain className="h-10 w-10 text-purple-500" />
                },
                {
                  title: "Code Samples",
                  description: "Example implementations and snippets",
                  icon: <Code className="h-10 w-10 text-purple-500" />
                },
                {
                  title: "Community Forums",
                  description: "Connect with other developers",
                  icon: <Users className="h-10 w-10 text-purple-500" />
                },
                {
                  title: "Webinars & Workshops",
                  description: "Live and recorded training sessions",
                  icon: <Globe className="h-10 w-10 text-purple-500" />
                }
              ].map((resource, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {resource.icon}
                    <div>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="link" className="text-purple-500 p-0">Access Resource</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action for Collaboration */}
        <section className="py-20 border-b border-border bg-black">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking for Collaborators?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with skilled developers, researchers, and domain experts to bring your computer vision projects to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Find Collaborators
                </Button>
                <Button size="lg" variant="outline">
                  Post a Project
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 border-b border-border">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how developers and organizations are using PerceptAI to solve real-world problems.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "PerceptAI's tools helped us reduce our model development time by 60% and significantly improved accuracy.",
                  name: "Sarah Johnson",
                  role: "AI Research Lead, TechCorp",
                  avatar: "/placeholder.svg?height=100&width=100&text=SJ"
                },
                {
                  quote: "The community support and comprehensive documentation made implementing our complex vision system straightforward.",
                  name: "Michael Chen",
                  role: "Senior Developer, VisionWorks",
                  avatar: "/placeholder.svg?height=100&width=100&text=MC"
                },
                {
                  quote: "We were able to deploy our retail analytics solution in record time thanks to PerceptAI's pre-trained models and optimization tools.",
                  name: "Priya Patel",
                  role: "CTO, RetailInsight",
                  avatar: "/placeholder.svg?height=100&width=100&text=PP"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 border-b border-border bg-black">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter for the latest updates, tutorials, and community news.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Trending Technologies */}
        <section className="py-20 border-b border-border">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Technologies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay at the forefront of computer vision innovation with these trending technologies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Real-time 3D Reconstruction",
                  description: "Convert 2D images into detailed 3D models in real-time for AR/VR applications.",
                  image: "/placeholder.svg?height=300&width=500&text=3D"
                },
                {
                  title: "Multimodal Vision-Language Models",
                  description: "Combining visual understanding with natural language processing for more intuitive interfaces.",
                  image: "/placeholder.svg?height=300&width=500&text=Multimodal"
                },
                {
                  title: "Edge AI Optimization",
                  description: "Deploy high-performance computer vision models on resource-constrained edge devices.",
                  image: "/placeholder.svg?height=300&width=500&text=Edge"
                },
                {
                  title: "Synthetic Data Generation",
                  description: "Create realistic synthetic datasets to train robust computer vision models.",
                  image: "/placeholder.svg?height=300&width=500&text=Synthetic"
                }
              ].map((tech, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/2">
                    <img 
                      src={tech.image || "/placeholder.svg"} 
                      alt={tech.title}
                      className="w-full h-auto rounded-lg object-cover aspect-video"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                    <p className="text-muted-foreground mb-4">{tech.description}</p>
                    <Button variant="link" className="text-purple-500 p-0">Learn More</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Introduction */}
        <section className="py-20 border-b border-border">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/placeholder.svg?height=720&width=1280&text=PerceptAI+Introduction+Video" 
                    alt="PerceptAI Introduction Video"
                    className="w-full h-full object-cover"
                  />
                  <Button size="icon" className="absolute bg-purple-600 hover:bg-purple-700 rounded-full h-16 w-16">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="text-center mt-8">
                <h2 className="text-2xl font-bold mb-2">See PerceptAI in Action</h2>
                <p className="text-muted-foreground">
                  Watch our quick introduction video to learn how PerceptAI can transform your computer vision projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Search Bar */}
        <section className="py-20 border-b border-border bg-black">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Find What You Need</h2>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  className="pl-10 bg-background h-12" 
                  placeholder="Search for projects, resources, or collaborators..." 
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="cursor-pointer">Object Detection</Badge>
                <Badge variant="outline" className="cursor-pointer">Face Recognition</Badge>
                <Badge variant="outline" className="cursor-pointer">OCR</Badge>
                <Badge variant="outline" className="cursor-pointer">Image Segmentation</Badge>
                <Badge variant="outline" className="cursor-pointer">Pose Estimation</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10,000+", label: "Developers" },
                { value: "5,000+", label: "Projects" },
                { value: "200+", label: "Pre-trained Models" },
                { value: "50+", label: "Countries" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-purple-500 mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Computer Vision Projects?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of developers already building the future with PerceptAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get Started for Free
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 bg-black">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-6 w-6 text-purple-500" />
                <span className="text-xl font-bold">PerceptAI</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-xs">
                Advanced computer vision tools and solutions for developers, researchers, and businesses.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Share">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Releases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Tutorials</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Community</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Model Zoo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-purple-500">Partners</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-border" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PerceptAI. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-purple-500">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-purple-500">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-purple-500">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
