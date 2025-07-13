"use client";
import React, { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
// Import Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactSeller() {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const { id } = useParams();
  const pathname = usePathname();
  const [propertyName, setPropertyName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/project/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPropertyName(data?.name || "Unknown Property");
        })
        .catch((error) => console.error("Error fetching property:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(false);

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          propertyName,
          url: pathname,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          
        });
        // Reset form after success
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        setIsSubmitting(true);
      } else {
        toast.error("Failed to send message.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsSubmitting(true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending the message.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(true);
    }
  };

  return (
    <>
      {/* Add ToastContainer */}
      <ToastContainer
      style={{ zIndex: 999999 , marginTop: "100px"}}
      />
      <h5 className="title fw-6">Contact Seller</h5>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="ip-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="ip-group">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="ip-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="ip-group">
          <textarea
            name="message"
            rows={4}
            placeholder="Message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="tf-btn btn-view primary hover-btn-view w-100"
          disabled={!isSubmitting}
          style={{ filter: !isSubmitting ? 'opacity(50%)' : 'none' }}
        >
          {isSubmitting ? "Submit" : "Sending..."}
          <span className="icon icon-arrow-right2" />
        </button>
      </form>
    </>
  );
}