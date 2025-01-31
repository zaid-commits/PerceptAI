import FeatureCards from "../Section1/HeroSection/TestCards";
import FloatingNavbar from "../Navbar";
import { NeuHero } from "../testing";
import About from "../About";
import Footer from "../Footer";
import Promo from "../promo";

const Home = () => {
  return (
    <div className="bg-[#000] "data-scroll data-scroll-speed="2.0">
      <div className="flex flex-col justify-center items-center min-h-screen  ">
        <FloatingNavbar />
        <NeuHero />
      </div>
      <About />
      <div className="h-fit w-[100%] p-10 ">
        <div className=" text-white	">

          <section className="flex items-center justify-center text-center text-white py-10 px-4">
            <h1 className="text-5xl md:text-5xl font-bold capitalize  leading-tight ">
              AI Infused Vision Directory is  platform
              <span className="inline-block relative top-2 mx-2 border border-[#ffffff90] rounded-lg overflow-hidden ">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-48 h-28 md:w-50 md:h-14 object-cover "
                >
                  <source src="https://www.shutterstock.com/shutterstock/videos/1064002762/preview/stock-footage-autonomous-or-driverless-car-driving-through-a-crowded-street-in-los-angeles-computer-vision-with.webm" type="video/mp4" />
                </video>
              </span>
              for computer vision enthu.
            </h1>
          </section>



          <p className="text-[1rem] text-center">Explore, Create, Share: These Are Our Features!</p>
        </div>
        <FeatureCards />

      </div>
      <Promo/>
      <Footer/>

    </div>

  );
};

export default Home;
