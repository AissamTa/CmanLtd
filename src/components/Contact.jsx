// src/pages/ContactPage.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient.js"; // Import your Supabase client
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // Rename for clarity
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(""); // State for email sending status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the current field as user types
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Use the renamed setter
    setErrors({});
    setEmailStatus(""); // Clear email status

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 1. Insert data into Supabase table
      const { error: dbError } = await supabase
        .from("contacts") // 'contacts' is the table name
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        ]);

      if (dbError) {
        console.error("Supabase DB insert error:", dbError);
        setErrors({
          general:
            dbError.message || "Failed to save message. Please try again.",
        });
        setIsLoading(false); // Stop loading if DB insert fails
        return;
      }

      setSuccessMessage("Your message has been sent successfully!"); // Use the renamed setter
      setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form fields on success

      // 2. Invoke Supabase Edge Function to send email
      setEmailStatus("Sending confirmation email...");

      // Your provided fetch call integrated here:
      const emailResponse = await fetch(
        `https://ossbzkgjbjufyefupkzo.supabase.co/functions/v1/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Use your Supabase Anon Key for authentication.
            // These headers are essential for the Edge Function to recognize the request.
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone, // Ensure phone is included in the body
            message: formData.message,
          }),
        }
      );

      const emailResult = await emailResponse.json();

      if (!emailResponse.ok) {
        console.error("Edge Function email error:", emailResult.error);
        setEmailStatus(
          `Failed to send email: ${emailResult.error || "Unknown error"}`
        );
      } else {
        setEmailStatus("Confirmation email sent!");
      }
    } catch (error) {
      console.error("Overall submission error:", error);
      setErrors({
        general: "An unexpected error occurred. Please try again later.",
      });
      setEmailStatus(""); // Clear email status if a general error occurs
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4">
      <div className="py-10 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Contact Us
          </h2>

          {/* ...move your existing content here... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
                  {successMessage}
                </div>
              )}
              {/* Error Messages */}
              {Object.keys(errors).length > 0 && !errors.general && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                  <ul className="list-disc list-inside">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Name"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Phone Number"
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <textarea
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32 ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Message"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
            <div className="md:col-span-1">
              <div className="w-full h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3239.4316569244816!2d-5.905849724565329!3d35.715601172576164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m5!1s0xd0b889caf6a3e99%3A0x401e163ceb0363a!2s580%20entr%C3%A9e%20gzenaya%20ZI!3m2!1d35.7156012!2d-5.9032748!4m0!5e0!3m2!1sen!2sma!4v1742765519013!5m2!1sen!2sma"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                  className="rounded-md shadow-md"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
