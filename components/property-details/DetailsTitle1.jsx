"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {BASE_URL} from "@/app/api/constants";

export default function DetailsTitle1() {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const { data } = await axios.get(BASE_URL +`/api/project/${id}`);
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>No project found.</p>;

  let address = {};

  if (project.address && typeof project.address === "string") {
    try {
      address = JSON.parse(project.address);
    } catch (error) {
      console.error("Invalid JSON in address field:", error);
    }
  }

  return (
    // <div className="flat-section-v4">
    //   <div className="container">
    //     <div className="header-property-detail">
    //       <div className="content-bottom">
    //         <div className="box-left">
              <div className="info-box">
                <h5 className="fw-6 title">Location</h5>
                <p className="meta-item">
                  <span className="icon icon-mapPin" />
                  <span className="text-variant-1">
                    {address.fullAddress || "No address available"}
                    {address.state ? `, ${address.state}` : ""}
                    {address.zipCode ? `, ${address.zipCode}` : ""}
                    {address.neighborhood ? `, ${address.neighborhood}` : ""}
                  </span>
                </p>
              </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
