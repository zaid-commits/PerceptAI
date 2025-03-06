import FeatureCards from "../Section1/HeroSection/TestCards";
import FloatingNavbar from "../Navbar";
import { NeuHero } from "../testing";
import Footer from "../Footer";
import Promo from "../promo";
import { Brain,Layers,Globe,Code } from "lucide-react";
import { motion } from "motion/react"

const Home = () => {
  return (
    <div className="bg-[#000] "data-scroll data-scroll-speed="2.0">
      <div className="flex flex-col justify-center items-center min-h-screen  ">
        <FloatingNavbar />
        <NeuHero />
      </div>
      {/* <About /> */}

      <section id="features" className="py-20 ">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful Computer Vision Features</h2>
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
                <motion.div
                  key={index}
                  className="feature-card group w-[100%] bg-[#000] hover:bg-[#ffffff0f] transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="feature-icon text-white group-hover:text-purple-800 transition-colors duration-300">
                  {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      <div className="h-fit w-[100%] p-10 ">
        <div className=" text-white	">

          <section className="flex items-center justify-center text-center text-white py-10 px-4">
            <h1 className="text-5xl md:text-5xl font-bold capitalize  leading-tight ">
              AI Infused Vision Directory is  platform
              <span className="inline-block relative top-2 mx-2 border border-[#ffffff90] rounded-lg overflow-hidden ">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-48 h-28 md:w-50 md:h-14 object-cover "
                >
                  <source src="https://www.shutterstock.com/shutterstock/videos/1064002762/preview/stock-footage-autonomous-or-driverless-car-driving-through-a-crowded-street-in-los-angeles-computer-vision-with.webm" type="video/mp4" />
                </video>
              </span>
              for computer vision enthusiasts.
            </h1>
          </section>



          <p className="text-[1rem] text-center">Explore, Create, Share: These Are Our Features!</p>
        </div>
        <FeatureCards />

      </div>
      <Promo/>
      <Footer/>

    </div>

  );
};

export default Home;
