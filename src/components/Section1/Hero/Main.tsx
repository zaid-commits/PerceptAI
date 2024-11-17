import Hero from "@/components/Section1/Hero/Hero";
import Section2 from "@/components/Section2/Section2";
import Footer from "@/components/Footer";
import Section4 from "@/components/Section4/Section4";
import Section5 from "@/components/Section5/Section5";

export function Main() {
    return(
        <div>
            <Hero />
            <Section4/>
            <Section2 />
            {/* <Section3 /> */}
            <Section5/>
            <Footer />
        </div>
    )
}