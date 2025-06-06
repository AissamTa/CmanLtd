import React from "react";
import AboutImage from "../assets/about.jpeg"; // Adjust the path as necessary
export default function About() {
  return (
    <div className="main-layout">
      {/* Header (you can import your header component here) */}

      {/* About Us Banner */}
      <div className=" py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left Column: Text Content */}
            <div className="w-full lg:w-5/12 space-y-6">
              {/* About CMAN Ltd */}
              <div className=" bg-gray-100 shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-2">About CMAN Ltd</h1>
                <p className="text-gray-700">
                  CMAN Ltd stands for Collaboration in Manufacturing, focusing
                  on fostering partnerships within the manufacturing industry to
                  drive efficiency, innovation, and growth.
                </p>
              </div>

              {/* Who We Are */}
              <div className="bg-gray-100 shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-2">Who We Are</h1>
                <p className="text-gray-700">
                  A company dedicated to enhancing collaboration in the
                  manufacturing industry.
                </p>
              </div>

              {/* Our Mission */}
              <div className="bg-gray-100 shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-2">Our Mission</h1>
                <p className="text-gray-700">
                  To create an interconnected manufacturing ecosystem where
                  businesses can work together efficiently, reduce costs, and
                  accelerate innovation.
                </p>
              </div>

              {/* Our Vision */}
              <div className="bg-gray-100 shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-2">Our Vision</h1>
                <p className="text-gray-700">
                  To be a leading force in transforming the manufacturing
                  industry through collaboration, technology integration, and
                  smart partnerships.
                </p>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="w-full lg:w-7/12 text-center">
              <figure>
                <img
                  src={AboutImage}
                  alt="Who We Are"
                  className="rounded-lg shadow-lg mx-auto max-w-full h-auto"
                />
                <figcaption className="mt-4 text-gray-600">
                  Collaboration in Manufacturing
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
