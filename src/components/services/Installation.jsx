import React from "react";
import { useParams } from "react-router-dom";

// --- Mock Data ---
// In a real application, this data might come from an API, a CMS, or a Redux store.
// We place it here to make the component work for this example.
const servicesData = [
  {
    id: "1",
    title: "Installation & Implementation",
    description:
      "We provide professional installation of all types of industrial and commercial equipment. Our certified technicians ensure that your machinery is set up for optimal performance and safety from day one.",
    image: "../assets/1742493208.png", // Make sure you have an image at this path in your public folder
  },
  {
    id: "2",
    title: "Preventive Maintenance",
    description:
      "Our preventive maintenance plans are designed to keep your operations running smoothly and prevent costly downtime. We perform regular check-ups, lubrication, and part replacements.",
    image: "/images/maintenance-service.jpg", // Make sure you have an image at this path in your public folder
  },
  {
    id: "3",
    title: "Technical Consulting",
    description:
      "Leverage our industry expertise to improve your processes. We offer consulting on equipment upgrades, workflow optimization, and energy efficiency to help you achieve your business goals.",
    image: "/images/consulting-service.jpg", // Make sure you have an image at this path in your public folder
  },
  {
    id: "4",
    title: "Training",
    description:
      "Tailored training programs designed to upskill your team, enhance their expertise, and ensure they are fully equipped to leverage new tools, technologies, and processes effectively.",
    image: "/images/consulting-service.jpg", // Make sure you have an image at this path in your public folder
  },
];
// --- End Mock Data ---

// The component is now renamed to ServiceDetail to be more generic
function Installation() {
  // Use the 'useParams' hook to get the dynamic 'id' from the URL
  const { id } = useParams();

  // Find the specific service from our data array that matches the id from the URL
  // Note: We use '==' instead of '===' because the 'id' from useParams is a string.
  const service = servicesData.find((s) => s.id === id);

  // A 'loading' state would be useful if you were fetching data from an API.
  // For this example, we'll assume the data is loaded instantly.

  // If no service is found for the given id, display a message.
  if (!service) {
    return (
      <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl text-center font-bold">Service Not Found</h2>
      </div>
    );
  }

  // Render the details of the found service
  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4">
      <div className="py-10">
        <div className="container mx-auto px-4">
          {/* Main Title for the Service */}
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {service.title}
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Service Image */}
            <div className="flex-shrink-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full md:w-96 h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Service Description */}
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                Service Details
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Installation;
