import FeatureCards from "@/TestCards";
import FloatingNavbar from "../Section1/Navbar/Navbar";
import { NeuHero } from "../testing";

const Home = () => {
  return (
    <div className="bg-[#161818]">
    <div className="flex flex-col justify-center items-center min-h-screen bg-black ">
      <FloatingNavbar />
      <NeuHero />
    </div>
    <div className=" h-[100vh] w-[100vw]">
      <FeatureCards />
      </div>
    </div>
      
  );
};

export default Home;
