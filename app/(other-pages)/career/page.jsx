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
      
      {/* Hero Section */}
      <section className="flat-title-page" style={{
        backgroundImage: "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}>
        <div className="overlay" style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(22, 30, 45, 0.7)"
        }}></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-12">
              <div className="content-title-page text-center">
                <h1 className="text-white mb-3">Join Our Growing Team</h1>
                <p className="text-white fs-18 mb-0">Shape the future of real estate with us</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="flat-section bg-surface">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="box-title text-center mb-5">
                <h2 className="mb-4">We Practice a Holistic Growth Approach Competitively</h2>
                <p className="body-1 text-variant-1 mb-4">
                  Step into the ecosystem of the competitive environment that nurtures professional growth aspirations with collaboration, and camaraderie moments. Our workplace embraces the synergy to learn, share, ideate, and build long-term and sturdy partnerships.
                </p>
                <p className="body-2 text-variant-1">
                  We have a work culture that respects every voiced perception. Join us to experience mega-growth opportunities and embrace continuous growth.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="box-benefit bg-white p-4 h-100 shadow-1 radius-30">
                <div className="icon-box mb-3">
                  <div className="box-icon w-60 round bg-primary-new">
                    <i className="icon icon-partnership text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Professional Growth</h5>
                <p className="text-variant-1 mb-0">
                  Experience continuous learning opportunities and career advancement in a supportive environment that values your professional development.
                </p>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="box-benefit bg-white p-4 h-100 shadow-1 radius-30">
                <div className="icon-box mb-3">
                  <div className="box-icon w-60 round bg-primary-new">
                    <i className="icon icon-proven text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Expert Team</h5>
                <p className="text-variant-1 mb-0">
                  Our talent pool addresses real estate apprehensions and resolves investors' asymmetrical problems across India with experienced expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="flat-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="box-title text-center mb-5">
                <h2 className="mb-3">Start Your Career Journey</h2>
                <p className="body-2 text-variant-1">
                  Ready to join our team? Fill out the application form below and take the first step towards an exciting career opportunity.
                </p>
              </div>
              
              <div className="widget-box-2">
                {submitted && (
                  <div className="alert alert-success mb-4" role="alert">
                    <div className="d-flex align-items-center">
                      <i className="icon icon-tick text-success me-2 fs-20"></i>
                      <strong>Thank you for your application!</strong> We'll review your submission and get back to you soon.
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="box-fieldset mb-3">
                        <label htmlFor="name" className="fw-6">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="box-fieldset mb-3">
                        <label htmlFor="mobile" className="fw-6">Mobile Number *</label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          className="form-control"
                          placeholder="Enter your mobile number"
                          value={form.mobile}
                          onChange={handleChange}
                          pattern="[0-9]{10,15}"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="box-fieldset mb-3">
                        <label htmlFor="experience" className="fw-6">Years of Experience *</label>
                        <input
                          type="number"
                          id="experience"
                          name="experience"
                          className="form-control"
                          placeholder="Enter years of experience"
                          value={form.experience}
                          onChange={handleChange}
                          min="0"
                          max="50"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="box-fieldset mb-3">
                        <label htmlFor="jobRole" className="fw-6">Preferred Job Role *</label>
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
                    </div>
                  </div>
                  
                  <div className="box-fieldset mb-4">
                    <label htmlFor="about" className="fw-6">Tell Us About Yourself *</label>
                    <textarea
                      id="about"
                      name="about"
                      className="form-control textarea"
                      placeholder="Share your background, skills, and what motivates you to join our team..."
                      value={form.about}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="text-center">
                    <button type="submit" className="tf-btn primary size-1">
                      <i className="icon icon-send me-2"></i>
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flat-section bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="box-title text-center">
                <h3 className="text-white mb-3">Ready to Make an Impact?</h3>
                <p className="text-white body-1 mb-4">
                  Join our experienced, expert, and considerate team that answers the searches for exclusive and elite immovable assets across segments and budgets.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <div className="d-flex align-items-center text-white">
                    <i className="icon icon-tick me-2"></i>
                    <span>Competitive Salary</span>
                  </div>
                  <div className="d-flex align-items-center text-white">
                    <i className="icon icon-tick me-2"></i>
                    <span>Growth Opportunities</span>
                  </div>
                  <div className="d-flex align-items-center text-white">
                    <i className="icon icon-tick me-2"></i>
                    <span>Collaborative Environment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}a