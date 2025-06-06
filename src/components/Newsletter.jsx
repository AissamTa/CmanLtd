import React, { useState } from "react";
import { supabase } from "../supabaseClient.js"; // Ensure this path is correct

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // For displaying success or error messages
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" }); // Reset message on new submission

    try {
      // --- Step 1: Insert the email into the 'newsletter' table ---
      const { error: insertError } = await supabase
        .from("newsletter")
        .insert({ email: email });

      // --- Handle potential errors from the insert operation ---
      if (insertError) {
        // '23505' is the Postgres error code for a unique constraint violation
        if (insertError.code === "23505") {
          throw new Error("This email address has already been subscribed.");
        }
        // For any other database error
        throw new Error("Could not subscribe. Please try again later.");
      }

      // --- Step 2: If insert is successful, invoke the Edge Function ---
      const { data: functionData, error: functionError } =
        await supabase.functions.invoke("send-welcome-email", {
          body: { email }, // Pass the email in the body
        });

      if (functionError) {
        // This error happens if the function itself fails
        throw new Error(
          "Subscription successful, but failed to send welcome email."
        );
      }

      // --- Set the final success message from the function ---
      setMessage({ text: functionData.message, type: "success" });
      setEmail(""); // Clear the input field on success
    } catch (error) {
      // --- Catch and display any error from the try block ---
      setMessage({
        text: error.message || "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setLoading(false); // Stop loading state, regardless of outcome
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
