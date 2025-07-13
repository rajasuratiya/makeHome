"use client";
import { useRef, useState } from "react";
import ContactMap from "./ContactMap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const sendToGoogleSheets = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(formRef.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const subject = formData.get("subject");
    const message = formData.get("message");

    try {
      const response = await fetch("/api/submitcontact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
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
        formRef.current.reset();
      } else {
        toast.error("Failed to send message.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer style={{ zIndex: 999999 }} />
      <section className="flat-section flat-contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="contact-content">
                <h4>Drop Us A Line</h4>
                <p className="body-2 text-variant-1">
                  Feel free to connect with us through our online channels.
                </p>
                <form
                  onSubmit={sendToGoogleSheets}
                  ref={formRef}
                  className="form-contact"
                >
                  <div className="box grid-2">
                    <fieldset>
                      <label htmlFor="name">Full Name:</label>
                      <input type="text" name="name" id="name" required />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="email">Email Address:</label>
                      <input type="email" name="email" id="email" required />
                    </fieldset>
                  </div>
                  <div className="box grid-2">
                    <fieldset>
                      <label htmlFor="phone">Phone Number:</label>
                      <input type="text" name="phone" id="phone" required />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="subject">Subject:</label>
                      <input type="text" name="subject" id="subject" />
                    </fieldset>
                  </div>
                  <fieldset>
                    <label htmlFor="message">Your Message:</label>
                    <textarea name="message" id="message" required />
                  </fieldset>
                  <button
                    className={`tf-btn primary size-1 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info">
                <h4>Contact Us</h4>
                <ul>
                  <li className="box">
                    <h6 className="title">Address:</h6>
                    <p className="text-variant-1">
                      A-801 & 803, Tower-3, Nx-One, Techzone - 4, Greater Noida
                      (West)- 201 306
                    </p>
                  </li>
                  <li className="box">
                    <h6 className="title">Infomation:</h6>
                    <p className="text-variant-1">
                      +91 88-604-605-44 <br />
                      info@makemyhomez.in
                    </p>
                  </li>
                  <li className="box">
                    <div className="title">Opentime:</div>
                    <p className="text-variant-1">
                      Monday - Friday: 10:30 AM - 07:00 PM <br />
                      Saturday - Sunday: 11:00 AM - 06:00 PM
                    </p>
                  </li>
                  <li className="box">
                    <div className="title">Follow Us:</div>
                    <ul className="box-social">
                      {/* Your social media links/icons */}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div
          data-map-zoom={16}
          data-map-scroll="true"
        >
          <ContactMap />
        </div>
      </section>
    </>
  );
}