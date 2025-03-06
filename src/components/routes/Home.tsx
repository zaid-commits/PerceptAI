import FeatureCards from "../Section1/HeroSection/TestCards";
import FloatingNavbar from "../Navbar";
import { NeuHero } from "../testing";
import Footer from "../Footer";
import Promo from "../promo";
import { Brain, Layers, Globe, Code } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button";
import { MessageSquare, Users } from "lucide-react";
import About from "../About";
const Home = () => {
  return (
    <div className="bg-[#000]" data-scroll data-scroll-speed="2.0">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <FloatingNavbar />
        <NeuHero />
      </div>
      <About />

      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl font-bold mb-4 text-white">
              Powerful Computer Vision Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leverage our comprehensive suite of tools to build, deploy, and scale your computer vision applications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Brain className="h-10 w-10 text-purple-500" />,
                title: "AI-Powered Recognition",
                description: "Advanced object, face, and pattern recognition powered by state-of-the-art neural networks.",
                link: "/projects",
              },
              {
                icon: <Code className="h-10 w-10 text-purple-500" />,
                title: "Code Generation",
                description: "Automatically generate optimized OpenCV and TensorFlow code for your specific use cases.",
                link: "/codehelper",
              },
              {
                icon: <Layers className="h-10 w-10 text-purple-500" />,
                title: "Model Training",
                description: "Train and fine-tune custom computer vision models with your own datasets.",
                link: "/opencv",
              },
              {
                icon: <Globe className="h-10 w-10 text-purple-500" />,
                title: "Community Deployment",
                description: "Collaborate with the community to make the most out of it.",
                link: "",
              },
            ].map((feature, index) => (
              <Link to={feature.link} key={index}>
                <motion.div
                  className="feature-card group w-[100%] bg-[#000] hover:bg-[#ffffff0f] transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="feature-icon text-white group-hover:text-purple-800 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="h-fit w-[100%] p-10">
        <div className="text-white">
          <section className="flex items-center justify-center text-center text-white py-10 px-4">
            <h1 className="text-5xl md:text-5xl font-bold capitalize leading-tight">
              AI Infused Vision Directory is a platform
              <span className="inline-block relative top-2 mx-2 border border-[#ffffff90] rounded-lg overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-48 h-28 md:w-50 md:h-14 object-cover"
                >
                  <source
                    src="https://www.shutterstock.com/shutterstock/videos/1064002762/preview/stock-footage-autonomous-or-driverless-car-driving-through-a-crowded-street-in-los-angeles-computer-vision-with.webm"
                    type="video/mp4"
                  />
                </video>
              </span>
              for computer vision enthusiasts.
            </h1>
          </section>

{/* community section  */}

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
        

          {/* <p className="text-[1rem] text-center">
            Explore, Create, Share: These Are Our Features!
          </p> */}
        </div>
                {/* Statistics */}
                <section className="py-20 border-b border-border">
                  <div className="container">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                    { value: 10000, label: "Developers" },
                    { value: 5000, label: "Projects" },
                    { value: 200, label: "Pre-trained Models" },
                    { value: 50, label: "Countries" }
                    ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-purple-500 mb-2">
                      {stat.value.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </motion.div>
                    ))}
                  </div>
                  </div>
                </section>
        <FeatureCards />
      </div>
      <Promo />
      <Footer />
    </div>
  );
};

export default Home;
