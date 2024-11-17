'use client'

import { motion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const steps = [
  {
    title: "Sign Up",
    description: "Create your RoboFlow account to get started with our powerful computer vision tools.",
  },
  {
    title: "Upload Data",
    description: "Upload your image or video dataset to begin training your custom model.",
  },
  {
    title: "Annotate",
    description: "Use our intuitive annotation tools or autodistill autolabeling to prepare your data.",
  },
  {
    title: "Train Model",
    description: "Choose from a variety of state-of-the-art models and start training with one click.",
  },
  {
    title: "Deploy",
    description: "Deploy your trained model with our easy-to-use API or export for local use.",
  },
]

export default function GettingStartedGuide() {
  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Get Started in <span className="text-purple-400">5 Simple Steps</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 bg-purple-800 rounded-full p-2 mr-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button className="bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Start Your Journey <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}