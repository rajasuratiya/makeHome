"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Overview() {
  const [overviewData, setOverviewData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/project/${id}`)
        .then((response) => {
          setOverviewData(response.data.overview || {});
        })
        .catch((error) => {
          console.error("Error fetching overview:", error);
        });
    }
  }, [id]);

  // Mapping of keys to icons
  const iconMapping = {
    ID: "house-line",
    Landsize: "crop",
    Type: "sliders-horizontal",
    Garages: "garage",
    Bedrooms: "bed1",
    Bathrooms: "bathtub",
    "Year Built": "hammer",
    Size: "ruler",
  };

  return (
    <>
      <h5 className="title fw-6">Overview</h5>
      <ul className="info-box">
        {Object.entries(overviewData).map(([key, value]) => (
          <li className="item" key={key}>
            <a href="#" className="box-icon w-52">
              <i className={`icon icon-${iconMapping[key] || ""}`} />
            </a>
            <div className="content">
              <span className="label">{key}:</span>
              <span>{value}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}