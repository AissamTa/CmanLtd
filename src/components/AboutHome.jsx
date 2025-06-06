import React from "react";
import AboutImage from "../assets/about.jpeg"; // Adjust the path as necessary
export default function AboutHome() {
  return (
    <section className="about bg-white py-16 max-w-7xl mx-auto px-4 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center py-10 ">
        {/* Text Section */}
        <div className="md:w-5/12 mb-10 md:mb-0">
          <div className="titlepage">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 mb-6">
              CMAN Ltd stands for Collaboration in Manufacturing, focusing on
              fostering partnerships within the manufacturing industry to drive
              efficiency, innovation, and growth.
            </p>
            <a
              href="/about" // Replace with your actual route
              className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-300"
            >
              Read More
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-7/12">
          <div className="about_img">
            <figure>
              <img
                src={AboutImage}
                alt="About Us"
                className="w-full rounded-lg shadow-lg"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
