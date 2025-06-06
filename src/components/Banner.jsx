import React from "react";
import bgImage from "../assets/bg3.jpeg"; // Adjust the path as necessary
export default function Banner() {
  return (
    <section className="relative h-[650px] w-full overflow-hidden banner_main">
      <img
        src={bgImage}
        alt="Collaboration in Manufacturing"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center px-4 mt-20">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Collaboration in Manufacturing
          </h1>
          <p className="text-white text-lg md:text-xl">
            Driving innovation and efficiency through partnerships.
          </p>
        </div>
      </div>
    </section>
  );
};
