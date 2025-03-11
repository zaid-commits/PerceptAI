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
import CountUp from 'react-countup';
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
                link: "/community",
              },
            ].map((feature, index) => (
              <Link to={feature.link} key={index}>
                <motion.div
                  className="feature-card group w-[100%] bg-[#000] hover:bg-[#ffffff0f] transition-colors duration-300 border border-[#2f285fb1]"
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

       

        <section id="community" className="py-20">
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-white mb-4">Community Spotlight</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-gray-400">
        Join a thriving community of computer vision experts, developers, and enthusiasts.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Top Contributors Card */}
      <Card className="bg-[#121212] border border-[#1f1f1f] shadow-lg rounded-lg backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
        <Users className="h-5 w-5 text-purple-500" />
        Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 justify-center">
        {[
          { src: "https://github.com/zaid-commits.png", fallback: "ZC" },
          { src: "https://github.com/purohitdev.png", fallback: "PD" },
          { src: "/placeholder.svg?height=100&width=100&text=U3", fallback: "U3" },
          { src: "/placeholder.svg?height=100&width=100&text=U4", fallback: "U4" },
          { src: "/placeholder.svg?height=100&width=100&text=U5", fallback: "U5" },
        ].map((contributor, i) => (
          <Avatar key={i} className="h-14 w-14 border-2 border-purple-500 hover:scale-105 transition-transform duration-200">
            <AvatarImage src={contributor.src} />
            <AvatarFallback className="bg-purple-700 text-white">{contributor.fallback}</AvatarFallback>
          </Avatar>
        ))}
          </div>
        </CardContent>
        <CardFooter>
       
          <Button variant="outline" size="sm" className="w-full bg-[#67656576] text-white  border-gray-500 hover:bg-purple-500">
          <Link to="/community">
            View All Contributors
        </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Featured Projects Card */}
      <Card className="bg-[#121212] border border-[#1f1f1f] shadow-lg rounded-lg backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Layers className="h-5 w-5 text-purple-500" />
            Featured Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            "Facial Emotion Recognition",
            "Real-time Object Tracking",
            "Document OCR System",
          ].map((project, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-300">
              <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse"></div>
              <span className="hover:text-white transition-colors duration-200">{project}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter>
        <Button variant="outline" size="sm" className="w-full bg-[#67656576] text-white  border-gray-500 hover:bg-purple-500">
        Explore Projects
          </Button>
        </CardFooter>
      </Card>

      {/* Recent Discussions Card */}
      <Card className="bg-[#121212] border border-[#1f1f1f] shadow-lg rounded-lg backdrop-blur-lg">
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
            <div key={i} className="flex items-center gap-3 text-gray-300">
              <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse"></div>
              <span className="hover:text-white transition-colors duration-200">{topic}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter>
        <Button variant="outline" size="sm" className="w-full bg-[#67656576] text-white  border-gray-500 hover:bg-purple-500">
        Join the Conversation
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</section>

        

          <p className="text-[1rem] text-center mt-5">
            Explore, Create, Share: These Are Our Features!
          </p>
        </div>
                {/* Statistics */}
                <section className="py-20">
                  <div className="container">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                    { value: 1000, label: "Developers" },
                    { value: 200, label: "Projects" },
                    { value: 500, label: "Active Community Members" },
                    { value: 50, label: "Resources" }
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
                      <CountUp end={stat.value} duration={2} />+
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </motion.div>
                    ))}
                  </div>
                  </div>
                </section>
        {/* <FeatureCards /> */}
    

        <section id="resources" className="py-24 ">
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
        Developer Resources
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        Access cutting-edge documentation, tutorials, and tools to supercharge your development journey.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          title: "Documentation",
          description: "Comprehensive guides and API references",
          icon: <Code className="h-12 w-12 text-purple-400" />
        },
        {
          title: "Tutorials",
          description: "Step-by-step guides for common use cases",
          icon: <Layers className="h-12 w-12 text-purple-400" />
        },
        {
          title: "Model Zoo",
          description: "Pre-trained models ready for deployment",
          icon: <Brain className="h-12 w-12 text-purple-400" />
        },
        {
          title: "Code Samples",
          description: "Example implementations and snippets",
          icon: <Code className="h-12 w-12 text-purple-400" />
        },
        {
          title: "Community Forums",
          description: "Connect with other developers",
          icon: <Users className="h-12 w-12 text-purple-400" />
        },
        {
          title: "Webinars & Workshops",
          description: "Live and recorded training sessions",
          icon: <Globe className="h-12 w-12 text-purple-400" />
        }
      ].map((resource, index) => (
        <div
          key={index}
          className="relative group overflow-hidden rounded-xl border border-gray-700 bg-[#111] p-6 
          shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-purple-500/50"
        >
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-transparent via-[#222] to-[#0A0A0A] opacity-0 
          transition-opacity duration-300 group-hover:opacity-100"></div>

          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-[#1A1A1A] rounded-lg group-hover:bg-purple-500/20 transition">
              {resource.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
              <p className="text-gray-400 text-sm">{resource.description}</p>
            </div>
          </div>

          <div className="mt-6 z-20 ">
            <button
              className="w-full bg-[#67656576] text-white  border-gray-500 hover:bg-purple-500 rounded-md"
            >
              Access Resource
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      </div>
         {/* Trending Technologies */}
      

<section className="py-24 ">
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-white tracking-tight">
        Trending Technologies
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        Stay at the forefront of computer vision innovation with these emerging trends.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {[
        {
          title: "Real-time 3D Reconstruction",
          description: "Convert 2D images into detailed 3D models in real-time for AR/VR applications.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNWC4zi55FgsZOk1qOlaayaQBCEJwrZTGCFg&s"
        },
        {
          title: "Multimodal Vision-Language Models",
          description: "Combining visual understanding with natural language processing for more intuitive interfaces.",
          image: "https://media.geeksforgeeks.org/wp-content/uploads/20240926175423/Vision-Language-Models.webp"
        },
        {
          title: "Edge AI Optimization",
          description: "Deploy high-performance computer vision models on resource-constrained edge devices.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHV2jQpMFcbP3ybw0k_PmSE36HowAQKQtGmQ&s"
        },
        {
          title: "Synthetic Data Generation",
          description: "Create realistic synthetic datasets to train robust computer vision models.",
          image: "https://cdn.prod.website-files.com/63fb240c478a961afe78a8b0/65942139ad8f21bac72301a4_Synthetic%20Data%20Generation.png"
        }
      ].map((tech, index) => (
        <div 
          key={index} 
          className="group relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl 
          bg-[#111111]/70 border border-gray-800 backdrop-blur-md shadow-lg transition-all 
          duration-300 hover:scale-[1.02] hover:shadow-purple-500/40"
        >
          {/* Image Section */}
          <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
            <img 
              src={tech.image} 
              alt={tech.title}
              className="w-full h-auto rounded-lg object-cover aspect-video transition-all 
              duration-300 group-hover:scale-105"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {tech.title}
            </h3>
            <p className="text-gray-400 text-md leading-relaxed mb-4">
              {tech.description}
            </p>
            <button 
              className="inline-flex items-center gap-2 text-purple-400 text-sm font-medium 
              transition-all duration-300 hover:text-white hover:underline"
            >
              Learn More →
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Add this section after the Trending Technologies section */}

<section className="py-24">
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-white tracking-tight">
        Latest Research Papers
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        Stay updated with cutting-edge computer vision research and breakthroughs
      </p>
    </div>

    <div className="grid grid-cols-1 gap-8">
      {[
        {
          title: "NeRF: Neural Radiance Fields for View Synthesis",
          authors: "Ben Mildenhall, Pratul P. Srinivasan, Matthew Tancik",
          date: "2024",
          category: "3D Vision",
          citations: 12500,
          abstract: "A novel method for synthesizing novel views of complex scenes using a fully-connected deep network trained to represent a continuous volumetric scene function.",
          tags: ["Neural Rendering", "View Synthesis", "3D Reconstruction"]
        },
        {
          title: "DINO: Emerging Properties in Self-Supervised Vision Transformers",
          authors: "Mathilde Caron, Hugo Touvron, Ishan Misra",
          date: "2024",
          category: "Self-Supervised Learning",
          citations: 8900,
          abstract: "Self-supervised vision transformers show emerging properties comparable to human vision systems without explicit supervision.",
          tags: ["Vision Transformers", "Self-Supervised", "Deep Learning"]
        },
        {
          title: "SAM: Segment Anything Model",
          authors: "Alexander Kirillov, Eric Mintun, Nikhila Ravi",
          date: "2024",
          category: "Segmentation",
          citations: 5600,
          abstract: "A new AI model that can identify and segment any object in an image based on any form of user prompt.",
          tags: ["Segmentation", "Foundation Models", "Computer Vision"]
        }
      ].map((paper, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative bg-[#111111]/70 border border-gray-800 rounded-xl p-6 
          hover:shadow-purple-500/20 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Paper Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-purple-400 text-sm">{paper.category}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 text-sm">{paper.date}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 
              transition-colors duration-300">
                {paper.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4">
                {paper.authors}
              </p>
              
              <p className="text-gray-500 text-sm mb-4">
                {paper.abstract}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {paper.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-purple-500/10 
                    text-purple-400 border border-purple-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Citations & Actions */}
            <div className="flex flex-col md:items-end justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>{paper.citations.toLocaleString()} citations</span>
              </div>

              <button className="mt-4 px-4 py-2 rounded-lg bg-[#67656576] text-white 
              border-gray-500 hover:bg-purple-500 transition-all duration-300">
                Read Paper
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="text-center mt-10">
      <button className="px-6 py-3 rounded-lg bg-purple-500/10 text-purple-400 
      hover:bg-purple-500 hover:text-white transition-all duration-300 border border-purple-500/20">
        View More Research Papers
      </button>
    </div>
  </div>
</section>

        {/* Video Introduction */}
   {/* Video Introduction */}
<section className="py-24 ">
  <div className="container">
    <div className="max-w-4xl mx-auto">
      {/* Video Wrapper */}
      <div 
        className="relative w-full aspect-video overflow-hidden rounded-xl bg-black 
        border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-purple-500/30"
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>

        {/* Video Thumbnail */}
        <img 
          src="https://perceptai.impic.tech/src/assets/logos/corelogo.png" 
          alt="PerceptAI Introduction Video"
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
        />

        {/* Play Button */}
        <button 
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div 
            className="relative bg-purple-600/90 hover:bg-purple-500 transition-all duration-300 rounded-full 
            h-20 w-20 flex items-center justify-center shadow-lg group-hover:scale-110"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-10 h-10"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            {/* Subtle Glow */}
            <div 
              className="absolute inset-0 h-full w-full rounded-full bg-purple-500/40 blur-xl opacity-60 group-hover:opacity-90"
            ></div>
          </div>
        </button>
      </div>

      {/* Text Content */}
      <div className="text-center mt-10">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          See PerceptAI in Action
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Watch our quick introduction video to learn how PerceptAI can transform your computer vision projects.
        </p>
      </div>
    </div>
  </div>
</section>

      <Promo /> 
       <Footer />
    </div>
  );
};

export default Home;
