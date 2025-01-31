import Footer from '../Footer'
import AllResources from '../Resources/AllResources'
import FloatingNavbar from '../Navbar'
import Promo from '../promo'


function Resources() {
    return (
        <div className='bg-[#000]' data-scroll data-scroll-speed="2.0">
            <FloatingNavbar />
            <AllResources/>
            <Promo/>
            <Footer/>
        </div>
    )
}

export default Resources
