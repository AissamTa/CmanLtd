import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Newsletter from "./Newsletter";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage(
        <div className="text-red-600">
          ❌ Please enter a valid email address.
        </div>
      );
      return;
    }

    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          // Unique constraint failed (duplicate email)
          setMessage(
            <div className="text-yellow-500">
              ⚠️ This email is already subscribed.
            </div>
          );
        } else {
          console.error(error);
          setMessage(
            <div className="text-red-600">
              ❌ Subscription failed. Please try again.
            </div>
          );
        }
      } else {
        setMessage(
          <div className="text-green-600">✅ Thank you for subscribing!</div>
        );
        setEmail("");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage(
        <div className="text-red-600">❌ An unexpected error occurred.</div>
      );
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
                Zone Industrielle Gzenaya Lot 580 Bureau ETG 1 Tanger
              </li>
              <li>
                <i className="fa fa-mobile mr-2" aria-hidden="true"></i>
                +212 700000827
              </li>
              <li>
                <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
                <a href="mailto:contact@cman.ma" className="hover:underline">
                  contact@cman.ma
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Menu Link</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription Form */}
          <div className="mt-8 md:mt-0">
            <Newsletter />
          </div>
        </div>
      </div>
    </footer>
  );
}
