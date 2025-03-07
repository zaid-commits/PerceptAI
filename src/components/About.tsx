"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const videoData = [
  {
    src: "https://videos.ctfassets.net/zi2yef4nw297/6iLyQuUsxpjyk2ijhpKu4X/76c7b2ccdb7e3fac49bd19f262ce2ab4/Home_Video_August_3.mp4",
    text: "Welcome to the world of innovation!",
  },
  {
    src: "https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5e8c8945e61eaf09620e_walking-trace-and-corner-and-mask%20(1)%20(2)-transcode.mp4",
    text: "Walk through our journey with us.",
  },
  {
    src: "https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66cc83e20f0b4116036ea1b0_candy-1-transcode.mp4",
    text: "Sweet treats await your discovery.",
  },
  {
    src: "https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5f2568b2ea306911ab8f_supervision-0190-promo%20%281%29%20%281%29-transcode.mp4",
    text: "Supervision is key to progress.",
  },
]

const About: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = videoRefs.current.indexOf(entry.target as HTMLDivElement)
          if (entry.isIntersecting) setActiveIndex(index)
        })
      },
      { threshold: 0.7 } // Trigger animation when 70% of the element is visible
    )

    videoRefs.current.forEach((video) => video && observer.observe(video))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative w-full bg-black ">
  <div className=" p-20">
<h2 className=" text-center text-3xl md:text-4xl font-bold text-white z-10">  Our <span className="text-purple-500">Vision</span> in Action</h2>

</div>



      <h2 className="top-8 text-center text-3xl md:text-4xl font-bold text-white z-10"></h2>

      {videoData.map((video, index) => (
        <motion.div
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          className="h-[70vh] flex items-center justify-center"
        >
          <motion.div
            className="w-full max-w-5xl rounded-3xl overflow-hidden relative shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            animate={{
              scale: activeIndex === index ? 1 : 0.8,
              opacity: activeIndex === index ? 1 : 0.5,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <video className="w-full h-full object-cover" muted autoPlay loop playsInline style={{ filter: "brightness(0.6)" }}>
              <source src={video.src} type="video/mp4" />
            </video>

            <motion.div
              className="absolute inset-0 flex flex-col justify-between p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/30">
                  <p className="text-white text-xl md:text-3xl font-semibold">{video.text}</p>
                </div>
                <div className="bg-purple-500 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default About


