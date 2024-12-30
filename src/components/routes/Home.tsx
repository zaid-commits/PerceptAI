// import { useUser } from "@clerk/clerk-react";
import FloatingNavbar from "../Section1/Navbar/Navbar";
import { NeuHero } from "../testing";
const Home = () => {
//   const { user } = useUser();
  return (
    <div className="bg-black flex justify-center items-center min-h-screen">
      <FloatingNavbar />
      {/* <div className="text-white text-3xl">
       We are under development thanks for waiting 
        <span className="text-purple-800"> {user?.username}</span>
      </div> */}
      <NeuHero/>
    </div>
  );
};

export default Home;
