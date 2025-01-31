"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function Ace() {
  const placeholders = [
    "What is perceptAI?",
    "How does perceptAI work?",
    "How can I get started with perceptAI?",
    "What are the latest blog posts?",
    "How do I join the community chatroom?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4">
      <img
        src="./logo.jpg"
        alt="PerceptAI Logo"
        className="mb-6 w-20 h-20 rounded-full shadow-lg"
      />
      <h2 className="mb-12 text-2xl font-bold text-center sm:text-4xl text-white">
        Ask PerceptAI Anything
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}