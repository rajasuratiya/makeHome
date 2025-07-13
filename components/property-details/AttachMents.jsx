"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Attachments() {
  const { id } = useParams();
  const pathname = usePathname();
  const [attachments, setAttachments] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [propertyName, setPropertyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null); // Track clicked attachment

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/project/${id}`)
        .then(async (response) => {
          const attachmentData = response.data.attachment || [];
          setPropertyName(response.data?.name || "Unknown Property");

          const mediaPromises = attachmentData.map((file) =>
            axios
              .get(`/api/media/${file.mediaId}`)
              .then((res) => ({
                id: file.mediaId,
                name: file.name,
                type: file.type,
                url: res.data.url,
              }))
              .catch(() => ({
                id: file.mediaId,
                name: file.name,
                type: file.type,
                url: "#",
              }))
          );

          const mediaFiles = await Promise.all(mediaPromises);
          setAttachments(mediaFiles);
        })
        .catch((error) => {
          console.error("Error fetching attachments:", error);
        });
    }
  }, [id]);

  const getFileIcon = (type) => {
    if (type.includes("pdf")) return "https://homelengonextjs.vercel.app/images/home/file-1.png";
    if (type.includes("image")) return "https://homelengonextjs.vercel.app/images/home/file-2.png";
    if (type.includes("word") || type.includes("msword") || type.includes("doc"))
      return "https://homelengonextjs.vercel.app/images/home/file-2.png";
    if (type.includes("excel") || type.includes("spreadsheet"))
      return "https://homelengonextjs.vercel.app/images/home/file-2.png";
    if (type.includes("zip") || type.includes("rar")) return "/icons/file-zip.png";
    return "https://homelengonextjs.vercel.app/images/home/file-2.png";
  };

  const handleAttachmentClick = (e, attachment) => {
    e.preventDefault();
    setSelectedAttachment(attachment); // Store the clicked attachment
    setShowContactModal(true);
  };

  const closeModal = () => {
    setShowContactModal(false);
    setSelectedAttachment(null); // Reset selected attachment
    setFormData({ name: "", phone: "", email: "", message: "" }); // Reset form
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/propertyrequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          propertyName,
          url: pathname,
          attachment: selectedAttachment ? {
            id: selectedAttachment.id,
            name: selectedAttachment.name,
            type: selectedAttachment.type
          } : null // Include attachment details
        }),
      });

      if (response.ok) {
        toast.success("Request sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        closeModal();
        setIsSubmitting(false);
      } else {
        toast.error("Failed to send request.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      
      <h6 className="title fw-6">File Attachments</h6>
      <ToastContainer style={{ zIndex: 999999 }} />
      <div className="row">
        {attachments.length > 0 ? (
          attachments.map((file) => (
            <div className="col-sm-6" key={file.id}>
              <a
                href="#"
                onClick={(e) => handleAttachmentClick(e, file)}
                className="attachments-item"
              >
                <div className="box-icon w-60">
                  <Image
                    alt={file.name}
                    src={getFileIcon(file.type)}
                    width={40}
                    height={40}
                  />
                </div>
                <span>{file.name}</span>
                <i className="icon icon-download" />
              </a>
            </div>
          ))
        ) : (
          <p>No attachments available.</p>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                right: "15px",
                top: "15px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <h4 style={{ marginBottom: "20px" }}>
              Please complete the form to request{" "}
              {selectedAttachment?.name || "the files"}
            </h4>
            <div className="widget-box single-property-contact">
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
                  disabled={isSubmitting}
                  style={{ filter: isSubmitting ? "opacity(50%)" : "none" }}
                >
                  {isSubmitting ? "Submitting..." : "Request Attachments"}
                  <span className="icon icon-arrow-right2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}