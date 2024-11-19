'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Clock, Zap, BarChart } from 'lucide-react'

const metrics = [
  { name: 'Accuracy', value: 99.7, icon: BarChart, unit: '%' },
  { name: 'Processing Speed', value: 30, icon: Zap, unit: 'ms' },
  { name: 'CPU Usage', value: 15, icon: Cpu, unit: '%' },
  { name: 'Uptime', value: 99.99, icon: Clock, unit: '%' },
]

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

const AnimatedNumber = ({ value, duration = 2000 }: AnimatedNumberProps) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const step = value / (duration / 16)
    let currentValue = 0
    const timer = setInterval(() => {
      currentValue += step
      if (currentValue >= value) {
        clearInterval(timer)
        setCurrent(value)
      } else {
        setCurrent(currentValue)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, duration])

  return <>{current.toFixed(2)}</>
}

export default function PerformanceMetrics() {
  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Unparalleled <span className="text-purple-400">Performance</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black rounded-lg p-6 shadow-lg border border-purple-950"
            >
              <div className="flex items-center mb-4">
                <metric.icon className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">{metric.name}</h3>
              </div>
              <div className="text-4xl font-bold text-purple-400">
                <AnimatedNumber value={metric.value} />
                <span className="text-2xl ml-1">{metric.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}