'use client'

import { motion } from 'framer-motion'
import { Camera, Code2, Play } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  demoUrl: string
  codeUrl: string
  tags: string[]
}

export default function ProjectCard({
  title = "Object Detection",
  description = "Real-time object detection using OpenCV and YOLO",
  imageUrl = "/placeholder.svg",
  demoUrl = "#",
  codeUrl = "#",
  tags = ["OpenCV", "Python", "YOLO"]
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <Card className="relative bg-black/90 border-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Camera className="w-5 h-5" />
            {title}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-48 overflow-hidden rounded-lg">
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <a href={codeUrl} className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              View Code
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href={demoUrl} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Try Demo
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}