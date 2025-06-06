import React, { useState } from "react";
import { supabase } from "../supabaseClient.js";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" }); // Reset message on new submission

    try {
      // Use the Supabase client to invoke the Edge Function
      const { data, error } = await supabase.functions.invoke(
        "send-welcome-email", // This is the name of your function
        {
          body: { email }, // Pass the email in the body
        }
      );

      if (error) {
        throw error; // Throw error to be caught by the catch block
      }

      // Set a success message
      setMessage({ text: data.message, type: "success" });
      setEmail(""); // Clear the input field on success
    } catch (error) {
      // Set an error message
      setMessage({
        text: error.message || "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Subscribe to our Newsletter
      </h3>
      <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 rounded text-black"
          required
          disabled={loading} // Disable input while loading
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>

        {/* Display feedback message */}
        {message.text && (
          <div
            className={`mt-2 text-sm ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

export default Newsletter;
