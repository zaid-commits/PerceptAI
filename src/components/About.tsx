"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const About: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const videoSources: string[] = [
    "https://videos.ctfassets.net/zi2yef4nw297/6iLyQuUsxpjyk2ijhpKu4X/76c7b2ccdb7e3fac49bd19f262ce2ab4/Home_Video_August_3.mp4",
    "https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5e8c8945e61eaf09620e_walking-trace-and-corner-and-mask%20(1)%20(2)-transcode.mp4",
    "https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66cc83e20f0b4116036ea1b0_candy-1-transcode.mp4",
    "https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5f2568b2ea306911ab8f_supervision-0190-promo%20%281%29%20%281%29-transcode.mp4",
  ]

  const videoText: string[] = [
    "Welcome to the world of innovation!",
    "Walk through our journey with us.",
    "Sweet treats await your discovery.",
    "Supervision is key to progress.",
  ]

  const videoRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = videoRefs.current.indexOf(entry.target as HTMLDivElement)
      if (entry.isIntersecting) {
        setActiveIndex(index)
      }
    })
  }

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0% 0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver(handleIntersection, options)

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="relative h-[400vh] w-full px-4 md:px-8 lg:px-16 py-16 bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <h2 className="absolute top-8 left-0 right-0 text-center text-3xl md:text-4xl font-bold text-white z-10">
          Our <span className="text-purple-500">Vision</span> in Action
        </h2>
      </div>

      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          className="h-[100vh] w-full flex items-center justify-center"
          style={{
            position: "relative",
          }}
        >
          <motion.div
            className="w-full max-w-5xl rounded-3xl overflow-hidden relative shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            animate={{
              scale: activeIndex === index ? 1 : 0.75,
              opacity: activeIndex === index ? 1 : 0.5,
            }}
            transition={{
              scale: { duration: 0.8, ease: "easeInOut" },
              opacity: { duration: 0.8, ease: "easeInOut" },
            }}
          >
            <video
              className="w-full h-full object-cover aspect-video"
              muted
              autoPlay
              loop
              playsInline
              style={{ filter: "brightness(0.6)" }}
            >
              <source src={videoSources[index]} type="video/mp4" />
            </video>

            <motion.div
              className="absolute inset-0 flex flex-col justify-between p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                y: activeIndex === index ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/30">
                  <p className="text-white text-xl md:text-3xl font-semibold">{videoText[index]}</p>
                </div>
                <div className="bg-purple-500 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-sm px-4 py-3 rounded-lg border border-purple-500/30 self-start mt-auto">
                <p className="text-white text-sm md:text-base">
                  Discover how our computer vision technology transforms the way you see the world.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default About

