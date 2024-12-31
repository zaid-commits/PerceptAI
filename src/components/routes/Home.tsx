import FeatureCards from "@/TestCards";
import FloatingNavbar from "../Section1/Navbar/Navbar";
import { NeuHero } from "../testing";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <FloatingNavbar />
      <NeuHero />
      <FeatureCards />
    </div>
  );
};

export default Home;
