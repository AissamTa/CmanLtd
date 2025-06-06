import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { Link } from "react-router-dom"; // Add this import

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, image, description");

      if (error) {
        console.error("Error fetching services:", error.message);
      } else {
        setServices(data);
        console.log("Fetched services:", data);
      }

      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4">
      <div className="py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-700 text-lg mb-10 ">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Services</h2>
          </p>

          {loading ? (
            <p className="text-center text-gray-500">Loading services...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-100 shadow-md rounded-lg overflow-hidden"
                >
                  <div className="flex justify-center mt-5">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-[200px] h-[200px] object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link
                        to={`/services/${service.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {service.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
