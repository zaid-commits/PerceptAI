'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ProjectCard from './ProjectCard'
const filters = [
  'All',
  'Object Detection',
  'Face Recognition',
  'Image Processing',
  'Machine Learning'
]

interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
  category: string
  demoUrl: string
  codeUrl: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Real-time Object Detection',
    description: 'Detect objects in real-time using YOLO and OpenCV',
    imageUrl: '/placeholder.svg',
    category: 'Object Detection',
    demoUrl: '#',
    codeUrl: '#',
    tags: ['OpenCV', 'Python', 'YOLO']
  },
  // Add more projects as needed
]

export default function ProjectGrid() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filteredProjects = projects.filter(project => 
    selectedFilter === 'All' ? true : project.category === selectedFilter
  )

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            onClick={() => setSelectedFilter(filter)}
            className="relative group"
          >
            {filter}
            {selectedFilter === filter && (
              <motion.div
                layoutId="filter-indicator"
                className="absolute inset-0 bg-primary opacity-10 rounded-md"
                initial={false}
                transition={{ type: "spring", bounce: 0.2 }}
              />
            )}
          </Button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}