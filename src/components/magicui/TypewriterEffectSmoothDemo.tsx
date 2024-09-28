"use client";
import "../../App.css"
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "AI",
    },
    {
      text: "Infused",
    },
    {
      text: "Vision",
    },
    // {
    //   text: "Directory",
    // },
    {
      text: "Directory!",
      className: "text-purple-800 dark:text-red-500",
    },
  ];
  return (
    <div className="hero-title flex flex-col items-center justify-center   ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
