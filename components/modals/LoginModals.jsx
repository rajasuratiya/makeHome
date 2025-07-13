"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Handle successful login
      router.push("/dashboard");
      
    } catch (error) {
      setError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal modal-account fade" id="modalLogin">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flat-account">
            {/* <div className="banner-account">
              <Image
                alt="banner"
                src="/images/banner/banner-account1.jpg"
                width={570}
                height={980}
                priority
              />
            </div> */}
            <form onSubmit={handleLogin} className="form-account">
              <div className="title-box">
                <h4>Login</h4>
                <span
                  className="close-modal icon-close2"
                  data-bs-dismiss="modal"
                />
              </div>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="box">
                <fieldset className="box-fieldset">
                  <label htmlFor="email">Email</label>
                  <div className="ip-field">
                    <svg className="icon" width={18} height={18} viewBox="0 0 18 18" fill="none">
                      {/* SVG path remains the same */}
                    </svg>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </fieldset>
                <fieldset className="box-fieldset">
                  <label htmlFor="password">Password</label>
                  <div className="ip-field">
                    <svg className="icon" width={18} height={18} viewBox="0 0 18 18" fill="none">
                      {/* SVG path remains the same */}
                    </svg>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Your password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      minLength={6}
                    />
                  </div>
                </fieldset>
              </div>

              <div className="box box-btn">
                <button 
                  type="submit" 
                  className="tf-btn primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}