import FloatingNavbar from '../Navbar'
import Footer from '../Footer'
import Generation from '../Projects/ComputerVision/Generation'

const CodeGenerationPage = () => {
    return (
        <div className='bg-black text-white min-h-screen'>
            <FloatingNavbar />
            <div className=' py-20 flex justify-center items-center bg-black'>
                <div className=' mt-14 w-full h-full'>
                    <Generation />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CodeGenerationPage
