import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const videoSources: string[] = [
        'https://videos.ctfassets.net/zi2yef4nw297/6iLyQuUsxpjyk2ijhpKu4X/76c7b2ccdb7e3fac49bd19f262ce2ab4/Home_Video_August_3.mp4',
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5e8c8945e61eaf09620e_walking-trace-and-corner-and-mask%20(1)%20(2)-transcode.mp4',
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66cc83e20f0b4116036ea1b0_candy-1-transcode.mp4',
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5f2568b2ea306911ab8f_supervision-0190-promo%20%281%29%20%281%29-transcode.mp4',
    ];

    const videoText: string[] = [
        'Welcome to the world of innovation!',
        'Walk through our journey with us.',
        'Sweet treats await your discovery.',
        'Supervision is key to progress.',
    ];

    const videoRefs = useRef<(HTMLDivElement | null)[]>([]);  

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            const index = videoRefs.current.indexOf(entry.target as HTMLDivElement);
            if (entry.isIntersecting) {
                setActiveIndex(index);
            }
        });
    };

    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: null, 
            rootMargin: "25% 0px", 
            threshold: 0,
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        videoRefs.current.forEach(video => {
            if (video) {
                observer.observe(video);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="h-[400vh] w-full">
            {[0, 1, 2, 3].map((index) => (
                <motion.div
                    key={index}
                    ref={(el) => videoRefs.current[index] = el}  
                    className="h-[100vh] w-full rounded-3xl overflow-hidden relative top-10"
                    animate={{
                        scale: activeIndex === index ? 1 : 0.75,
                    }}
                    transition={{
                        scale: { duration: 1, ease: "easeInOut" },
                    }}
                >
                    <video
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                        loop
                        style={{ filter: 'brightness(0.4)' }}  
                    >
                        <source
                            src={videoSources[index]}
                            type="video/mp4"
                        />
                    </video>

                    <div className="absolute top-[5%] transform -translate-y-1/2 text-white text-3xl font-semibold w-full">
                        <p className="m-10">{videoText[index]}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default About;

