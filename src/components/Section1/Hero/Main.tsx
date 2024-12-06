import Hero from "@/components/Section1/Hero/Hero";
import Footer from "@/components/Footer";
import Section3 from "@/components/Section3/Section3";
import Section4 from "@/components/Section4/Section4";
import Section5 from "@/components/Section5/Section5";

export default function  Main() {
    return(
        <div>
            <Hero />
            <Section4/>
            <Section3 />
            <Section5/>
            <Footer />
        </div>
    )
}