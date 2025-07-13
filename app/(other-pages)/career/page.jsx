"use client";
import React, { useState } from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";

const jobRoles = [
  "Senior Sales Manager",
  "Sales Manager",
  "Sales Executive",
  "Tele Sales Executive",
  "HR Recruiter",
  "Graphic Designer",
  "Video Editor",
  "Digital Marketing",
  "Tele Caller",
];

export default function CareerPage() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    experience: "",
    jobRole: jobRoles[0],
    about: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Placeholder: handle form submission (API call, etc.)
  };

  return (
    <>
      <Header1 />
      <section className="career-section" style={{ padding: "40px 0", minHeight: "60vh" }}>
        <div className="container" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="mb-4" style={{ textAlign: "center" }}>Career Application</h2>
          {submitted ? (
            <div style={{ color: "green", textAlign: "center", marginBottom: 24 }}>
              Thank you for your application!
            </div>
          ) : null}
          <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="mobile">Mobile No.</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                className="form-control"
                value={form.mobile}
                onChange={handleChange}
                pattern="[0-9]{10,15}"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="experience">Years of Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                className="form-control"
                value={form.experience}
                onChange={handleChange}
                min="0"
                max="50"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="jobRole">Job Role</label>
              <select
                id="jobRole"
                name="jobRole"
                className="form-control"
                value={form.jobRole}
                onChange={handleChange}
                required
              >
                {jobRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="about">About Yourself</label>
              <textarea
                id="about"
                name="about"
                className="form-control"
                value={form.about}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit Application
            </button>
          </form>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
