'use client'

import { useState, useRef, useEffect } from 'react'
// import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Eye, Zap, Grid, Layers } from 'lucide-react'
import { Slider } from '../ui/slider'

const effects = [
  { name: 'Edge Detection', icon: Grid },
  { name: 'Color Segmentation', icon: Layers },
  { name: 'Motion Tracking', icon: Zap },
  { name: 'Face Detection', icon: Eye },
]

export default function ComputerVisionPlayground() {
  const [activeEffect, setActiveEffect] = useState(effects[0])
  const [intensity, setIntensity] = useState(50)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream
        video.play()
      })
      .catch(err => console.error("Error accessing the camera", err))

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawEffect = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        switch (activeEffect.name) {
          case 'Edge Detection':
            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
              const threshold = intensity * 2.55
              data[i] = data[i + 1] = data[i + 2] = avg > threshold ? 255 : 0
            }
            break
          case 'Color Segmentation':
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i], g = data[i + 1], b = data[i + 2]
              const max = Math.max(r, g, b)
              const threshold = intensity * 2.55
              if (max > threshold) {
                data[i] = r === max ? 255 : 0
                data[i + 1] = g === max ? 255 : 0
                data[i + 2] = b === max ? 255 : 0
              } else {
                data[i] = data[i + 1] = data[i + 2] = 0
              }
            }
            break
          case 'Motion Tracking':
            // Simplified motion effect
            for (let i = 0; i < data.length; i += 4) {
              data[i] = data[i] * (intensity / 100)
              data[i + 1] = data[i + 1] * (1 - intensity / 100)
              data[i + 2] = 255 - data[i + 2] * (intensity / 100)
            }
            break
          case 'Face Detection':
            // Simplified face effect (highlight skin tones)
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i], g = data[i + 1], b = data[i + 2]
              if (r > 95 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15) {
                data[i] += (255 - data[i]) * (intensity / 100)
                data[i + 1] += (255 - data[i + 1]) * (intensity / 100)
                data[i + 2] += (255 - data[i + 2]) * (intensity / 100)
              }
            }
            break
        }

        ctx.putImageData(imageData, 0, 0)
      }
      requestAnimationFrame(drawEffect)
    }

    drawEffect()

    return () => {
      const stream = video.srcObject as MediaStream
      const tracks = stream?.getTracks()
      tracks?.forEach(track => track.stop())
    }
  }, [activeEffect, intensity])

  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Computer Vision <span className="text-purple-500">Playground</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Experience the power of computer vision in real-time. Select an effect and adjust its intensity to see how our algorithms process visual data.
        </p>
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
              <canvas ref={canvasRef} className="w-full h-auto" />
            </div>
            <video ref={videoRef} className="hidden" />
          </div>
          <div className="w-full max-w-md space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {effects.map((effect) => (
                <Button
                  key={effect.name}
                  onClick={() => setActiveEffect(effect)}
                  variant={activeEffect.name === effect.name ? "default" : "outline"}
                  className="flex items-center justify-center py-6"
                >
                  <effect.icon className="w-6 h-6 mr-2" />
                  {effect.name}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <label htmlFor="intensity" className="block text-sm font-medium text-gray-400">
                Effect Intensity
              </label>
              <Slider
                id="intensity"
                min={0}
                max={100}
                step={1}
                value={[intensity]}
                onValueChange={(value: number[]) => setIntensity(value[0])}
                className="w-full"
              />
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{activeEffect.name}</h3>
              <p className="text-gray-400 text-sm">
                {activeEffect.name === 'Edge Detection' && "Highlights the boundaries and transitions between different objects in the image."}
                {activeEffect.name === 'Color Segmentation' && "Separates the image into distinct color regions, useful for object recognition."}
                {activeEffect.name === 'Motion Tracking' && "Detects and visualizes movement within the frame, essential for surveillance and gesture recognition."}
                {activeEffect.name === 'Face Detection' && "Identifies and highlights facial features, crucial for facial recognition systems."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}