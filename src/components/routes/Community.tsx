import { useEffect } from 'react'
import FloatingNavbar from "../Section1/Navbar/Navbar"
import Footer from "../Footer"
import Chat from '../Community/Chat'
const Community = () => {
  useEffect(() => {
    document.body.style.backgroundColor = 'black'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black text-purple-300">
      <FloatingNavbar />
      <main className="flex-grow p-4 md:p-8 pt-24 pb-16 flex justify-center items-center overflow-hidden">
        <Chat />
      </main>
      <Footer />
    </div>
  )
}

export default Community
