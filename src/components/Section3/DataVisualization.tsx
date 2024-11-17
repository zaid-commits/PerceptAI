'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from "@/components/ui/button"

const metrics = [
  { name: 'Accuracy', color: '#8884d8' },
  { name: 'Processing Speed', color: '#82ca9d' },
  { name: 'Memory Usage', color: '#ffc658' },
]

const generateData = (dataPoints = 7) => {
  return Array.from({ length: dataPoints }, (_, i) => ({
    name: `Day ${i + 1}`,
    'Accuracy': Math.random() * 20 + 80,
    'Processing Speed': Math.random() * 50 + 50,
    'Memory Usage': Math.random() * 30 + 20,
  }))
}

export default function DataVisualization() {
  const [data, setData] = useState(generateData())
  const [activeMetrics, setActiveMetrics] = useState(metrics.map(m => m.name))

  const toggleMetric = (metric: string) => {
    setActiveMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), prev[prev.length - 1]]
        newData[newData.length - 1] = {
          name: `Day ${parseInt(newData[newData.length - 1].name.split(' ')[1]) + 1}`,
          'Accuracy': Math.random() * 20 + 80,
          'Processing Speed': Math.random() * 50 + 50,
          'Memory Usage': Math.random() * 30 + 20,
        }
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Metrics</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Monitor key performance indicators of our computer vision systems in real-time.
        </p>
        <div className="mb-8 flex justify-center space-x-4">
          {metrics.map((metric) => (
            <Button
              key={metric.name}
              onClick={() => toggleMetric(metric.name)}
              variant={activeMetrics.includes(metric.name) ? "default" : "outline"}
              className="py-2"
              style={{ backgroundColor: activeMetrics.includes(metric.name) ? metric.color : '' }}
            >
              {metric.name}
            </Button>
          ))}
        </div>
        <motion.div 
          className="w-full h-[400px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              {metrics.map((metric) => (
                activeMetrics.includes(metric.name) && (
                  <Line 
                    key={metric.name}
                    type="monotone" 
                    dataKey={metric.name} 
                    stroke={metric.color} 
                    strokeWidth={2}
                    dot={false}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}