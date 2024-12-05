import CommunityForum from "../Community/Forum"
import Footer from "../Footer"
import FloatingNavbar from "../Section1/Navbar/Navbar"

function Community() {
  return (
    <div>
        <FloatingNavbar/>
        <CommunityForum/>
        <Footer/>
    </div>
  )
}
export default Community
