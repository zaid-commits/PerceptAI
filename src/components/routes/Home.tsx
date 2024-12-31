// import { useUser } from "@clerk/clerk-react";
import FloatingNavbar from "../Section1/Navbar/Navbar";
import { NeuHero } from "../testing";
const Home = () => {
//   const { user } = useUser();
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <FloatingNavbar />
      <NeuHero/>
    </div>
  );
};

export default Home;
