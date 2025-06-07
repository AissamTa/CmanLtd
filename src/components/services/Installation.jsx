import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient.js"; // Adjust the path if needed

function Installation() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, description, image")
        .eq("id", id)
        .single();

      if (error) {
        setService(null);
      } else {
        setService(data);
      }
      setLoading(false);
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl text-center font-bold">Loading...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl text-center font-bold">Service Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4">
      <div className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {service.title}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full md:w-96 h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
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
