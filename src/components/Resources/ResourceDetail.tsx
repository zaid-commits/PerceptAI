import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FloatingNavbar from "../Navbar"
import Footer from "../Footer"
import Promo from "../promo"
import ModernPurpleLoader from "../elements/Loader"

interface Resource {
  _id: string
  title: string
  description: string
  link: string
  category: string
  author: string
  posterImage?: string
  posterUsername?: string
  detailedDescription: string
  tags: string[]
}

const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [resource, setResource] = useState<Resource | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/resources/${id}`)
        const data = await response.json()
        setResource(data)
      } catch (error) {
        console.error("Error fetching resource:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResource()
  }, [id])

  if (isLoading) {
    return <ModernPurpleLoader />
  }

  if (!resource) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full">
          <div className="text-center">
            <span className="text-4xl mb-4">😕</span>
            <h2 className="text-2xl font-bold text-white mb-2">Resource Not Found</h2>
            <p className="text-gray-400 mb-4">
              We couldn't find the resource you're looking for. It may have been moved or deleted.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-20">
        <div className="bg-black border-purple-800 border-b-2 border-l-2 rounded-lg shadow-lg overflow-hidden relative max-w-3xl mx-auto p-6 ">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <span className="inline-block bg-purple-700 text-white text-xs px-2 py-1 rounded mb-2">
                  {resource.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{resource.title}</h1>
              </div>
              {/* <a
                href={resource.link}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors mt-4 md:mt-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resource
              </a> */}
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-400">{resource.description}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Detailed Description</h2>
              <p className="text-gray-400">{resource.detailedDescription}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span key={index} className="bg-purple-700 bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex items-center space-x-4 bg-black border-purple-800 border-b-2 border-l-2 p-2 rounded-lg">
            {resource.posterImage && (
              <img
                src={resource.posterImage || "/placeholder.svg"}
                alt={resource.posterUsername ?? "Poster"}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{resource.posterUsername ?? "Unknown"}</p>
              <p className="text-sm text-gray-400">Resource Contributor</p>
            </div>
          </div>
        </div>
      </div>
      <Promo />
      <Footer />
    </div>
  )
}

export default ResourceDetail
