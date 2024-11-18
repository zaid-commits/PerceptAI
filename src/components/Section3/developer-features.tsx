'use client'

import { useState, useEffect, lazy } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Terminal, Code2, Cpu, Zap, Layers, GitBranch } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from 'react-intersection-observer'

const TypingEffect = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [text])

  return <span>{displayText}</span>
}

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-black border-purple-800 overflow-hidden group hover:bg-purple-900/10 transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-800 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function DeveloperFeatures() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <div className="min-h-screen bg-black py-20 overflow-hidden">
      <div className="container px-4 mx-auto relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-16 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-800">developers.</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Start creating models in 5 minutes with RoboFlow interface, our open source high-performance computer vision pipeline.
          </p>
          
          {/* Command Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <div className="w-full bg-gray-900 rounded-lg border border-purple-800 p-4 shadow-lg">
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span>Install RoboFlow</span>
                </div>
                <pre className="text-sm text-purple-400 font-mono">
                  <TypingEffect text="pip install roboflow inference-sdk" />
                </pre>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <motion.div
            className="max-w-4xl mx-auto mb-12 bg-gray-900 rounded-lg border border-purple-800 p-4 shadow-lg overflow-hidden"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-mono text-sm">
                <div className="flex items-center text-gray-400 mb-2">
                  <Code2 className="w-4 h-4 mr-2" />
                  <span>Example Code</span>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-400">from</div>
                  <div className="text-green-400">roboflow</div>
                  <div className="text-blue-400">import</div>
                  <div className="text-yellow-400">Roboflow</div>
                  <div className="text-purple-400">
                    rf = Roboflow(api_key="YOUR_API_KEY")
                  </div>
                  <div className="text-purple-400">
                    project = rf.workspace().project("project-name")
                  </div>
                  <div className="text-purple-400">
                    model = project.version(1).model
                  </div>
                  <div className="text-gray-500"># infer on local image</div>
                  <div className="text-purple-400">
                    model.predict("your-image.jpg").save("prediction.jpg")
                  </div>
                </div>
              </div>
              <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <video  autoPlay muted loop
                  src="https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66cc83e20f0b4116036ea1b0_candy-1-transcode.mp4" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </motion.div>

          <Button className="bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Deploy with RoboFlow
          </Button>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={Cpu}
            title="roboflow supervision"
            description="A range of utilities for computer vision tasks and pre and post model training. Extensive APIs for advanced developers."
          />
          <FeatureCard
            icon={Terminal}
            title="roboflow notebooks"
            description="Open source Jupyter notebooks showing how to train and deploy with the latest state of the art computer vision models."
          />
          <FeatureCard
            icon={Zap}
            title="autodistill autolabeling"
            description="Use large vision language models to automatically label your data with high quality annotations, saving hours of manual work."
          />
          <FeatureCard
            icon={Code2}
            title="roboflow inference"
            description="An easy-to-use inference HTTP API. Deploy a range of computer vision models with a single API call, optimized for performance."
          />
          <FeatureCard
            icon={Layers}
            title="model versioning"
            description="Keep track of your model versions and easily switch between them for comparison and deployment."
          />
          <FeatureCard
            icon={GitBranch}
            title="collaborative workflows"
            description="Work seamlessly with your team on complex computer vision projects with built-in collaboration tools."
          />
        </div>
      </div>
    </div>
  )
}