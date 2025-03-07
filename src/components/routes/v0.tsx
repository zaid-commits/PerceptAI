"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Brain, Layers, Globe, Code, MessageSquare, Users, Play } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import FloatingNavbar from "../Navbar"
import { NeuHero } from "../testing"
import About from "../About"
import FeatureCards from "../Section1/HeroSection/TestCards"
import Promo from "../promo"
import Footer from "../Footer"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard = ({ icon, title, description, link }: FeatureCardProps) => (
  <Link to={link}>
    <motion.div
      className="feature-card group w-full bg-black hover:bg-[#ffffff0f] border border-purple-500/20 rounded-xl p-6 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h3 className="feature-title text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="feature-description text-gray-400">{description}</p>
    </motion.div>
  </Link>
)

interface StatCardProps {
  value: number;
  label: string;
  index: number;
}

const StatCard = ({ value, label, index }: StatCardProps) => (
  <motion.div
    className="text-center bg-black border border-purple-500/20 rounded-xl p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-4xl md:text-5xl font-bold text-purple-500 mb-2">{value.toLocaleString()}+</div>
    <div className="text-gray-400">{label}</div>
  </motion.div>
)

const Home = () => {
  return (
    <div className="bg-black text-white" data-scroll data-scroll-speed="2.0">
      <FloatingNavbar />

      <section className="min-h-screen flex items-center justify-center">
        <NeuHero />
      </section>

      <About />

      <section id="features" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Powerful Computer Vision Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leverage our comprehensive suite of tools to build, deploy, and scale your computer vision applications.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-10 w-10" />,
                title: "AI-Powered Recognition",
                description:
                  "Advanced object, face, and pattern recognition powered by state-of-the-art neural networks.",
                link: "/projects",
              },
              {
                icon: <Code className="h-10 w-10" />,
                title: "Code Generation",
                description: "Automatically generate optimized OpenCV and TensorFlow code for your specific use cases.",
                link: "/codehelper",
              },
              {
                icon: <Layers className="h-10 w-10" />,
                title: "Model Training",
                description: "Train and fine-tune custom computer vision models with your own datasets.",
                link: "/opencv",
              },
              {
                icon: <Globe className="h-10 w-10" />,
                title: "Community Deployment",
                description: "Collaborate with the community to make the most out of it.",
                link: "/community",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Infused Vision Directory</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A platform for computer vision enthusiasts to explore, create, and share groundbreaking projects.
            </p>
          </motion.div>
          <div className="relative">
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source
                  src="https://www.shutterstock.com/shutterstock/videos/1064002762/preview/stock-footage-autonomous-or-driverless-car-driving-through-a-crowded-street-in-los-angeles-computer-vision-with.webm"
                  type="video/webm"
                />
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <section id="community" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Community Spotlight</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join a thriving community of computer vision experts, developers, and enthusiasts.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-black border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
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
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  View All Contributors
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-black border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Layers className="h-5 w-5 text-purple-500" />
                  Featured Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Facial Emotion Recognition", "Real-time Object Tracking", "Document OCR System"].map(
                  (project, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span className="text-gray-300">{project}</span>
                    </div>
                  ),
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  Explore Projects
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-black border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  Recent Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Best practices for model optimization",
                  "Comparing YOLOv8 vs EfficientDet",
                  "Edge deployment challenges",
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span className="text-gray-300">{topic}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  Join the Conversation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">PerceptAI by the Numbers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers and organizations leveraging our platform.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 10000, label: "Developers" },
              { value: 5000, label: "Projects" },
              { value: 200, label: "Pre-trained Models" },
              { value: 50, label: "Countries" },
            ].map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      <FeatureCards />

      <section id="resources" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Developer Resources</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Access comprehensive documentation, tutorials, and tools to accelerate your development.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Documentation",
                description: "Comprehensive guides and API references",
                icon: <Code className="h-10 w-10 text-purple-500" />,
              },
              {
                title: "Tutorials",
                description: "Step-by-step guides for common use cases",
                icon: <Layers className="h-10 w-10 text-purple-500" />,
              },
              {
                title: "Model Zoo",
                description: "Pre-trained models ready for deployment",
                icon: <Brain className="h-10 w-10 text-purple-500" />,
              },
              {
                title: "Code Samples",
                description: "Example implementations and snippets",
                icon: <Code className="h-10 w-10 text-purple-500" />,
              },
              {
                title: "Community Forums",
                description: "Connect with other developers",
                icon: <Users className="h-10 w-10 text-purple-500" />,
              },
              {
                title: "Webinars & Workshops",
                description: "Live and recorded training sessions",
                icon: <Globe className="h-10 w-10 text-purple-500" />,
              },
            ].map((resource, index) => (
              <Card key={index} className="bg-black border-purple-500/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  {resource.icon}
                  <div>
                    <CardTitle className="text-white">{resource.title}</CardTitle>
                    <CardDescription className="text-gray-400">{resource.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button variant="link" className="text-purple-500 p-0 hover:text-purple-400">
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trending Technologies</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Stay at the forefront of computer vision innovation with these trending technologies.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Real-time 3D Reconstruction",
                description: "Convert 2D images into detailed 3D models in real-time for AR/VR applications.",
                image: "/placeholder.svg?height=300&width=500&text=3D",
              },
              {
                title: "Multimodal Vision-Language Models",
                description:
                  "Combining visual understanding with natural language processing for more intuitive interfaces.",
                image: "/placeholder.svg?height=300&width=500&text=Multimodal",
              },
              {
                title: "Edge AI Optimization",
                description: "Deploy high-performance computer vision models on resource-constrained edge devices.",
                image: "/placeholder.svg?height=300&width=500&text=Edge",
              },
              {
                title: "Synthetic Data Generation",
                description: "Create realistic synthetic datasets to train robust computer vision models.",
                image: "/placeholder.svg?height=300&width=500&text=Synthetic",
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-center bg-black border border-purple-500/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={tech.image || "/placeholder.svg"}
                    alt={tech.title}
                    className="w-full h-auto rounded-lg object-cover aspect-video"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-bold mb-2 text-white">{tech.title}</h3>
                  <p className="text-gray-400 mb-4">{tech.description}</p>
                  <Button variant="link" className="text-purple-500 p-0 hover:text-purple-400">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="aspect-video w-full bg-black rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=720&width=1280&text=PerceptAI+Introduction+Video"
                  alt="PerceptAI Introduction Video"
                  className="w-full h-full object-cover"
                />
                <Button size="icon" className="absolute bg-purple-600 hover:bg-purple-700 rounded-full h-16 w-16">
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-2">See PerceptAI in Action</h2>
              <p className="text-gray-400">
                Watch our quick introduction video to learn how PerceptAI can transform your computer vision projects.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Promo />
      <Footer />
    </div>
  )
}

export default Home

