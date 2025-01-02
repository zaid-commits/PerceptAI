import Footer from '../Footer'
import AllResources from '../Resources/AllResources'
import FloatingNavbar from '../Section1/Navbar/Navbar'
import Promo from '../Section5/promo'

function Resources() {
    return (
        <div className=' bg-[#161818]'>
            <FloatingNavbar />
            <AllResources/>
            <Promo/>
            <Footer/>
        </div>
    )
}

export default Resources
