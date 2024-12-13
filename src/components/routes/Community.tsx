import { useEffect } from 'react'
import FloatingNavbar from "../Section1/Navbar/Navbar"
// import Footer from "../Footer"
import Chat from '../Community/Chat'
import { Toaster, toast } from 'react-hot-toast'

const Community = () => {
  useEffect(() => {
    document.body.style.backgroundColor = 'black'
    toast("Chat server is spinning up! Please wait ~50 seconds as we are using a free instance for our backend server.", { duration: 50000 })
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black text-purple-300">
      <FloatingNavbar />
      <main className="flex-grow p-4 md:p-8 pt-24 pb-16 flex justify-center items-center">
        <Chat />
      </main>
      
      {/* <Footer /> */}
      <Toaster position='bottom-right'/>
    </div>
  )
}

export default Community
