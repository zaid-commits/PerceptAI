import Hero from "@/components/Section1/Hero/Hero";
import Section2 from "@/components/Section2/Section2";
import Section3 from "@/components/Section3/Section3";
import Footer from "@/components/Footer";
import VideoTab from "@/components/Section4/video-tabs";

export function Main() {
    return(
        <div>
            <Hero />
            <Section2 />
            <Section3 />
            <VideoTab />
            <Footer />
        </div>
    )
}