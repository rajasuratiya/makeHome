"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Nearby() {
  const { id } = useParams();
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/project/${id}`)
        .then((response) => {
          const nearbyData = response.data.whatsNearby || {};

          // Convert object into an array of { label, distance }
          const formattedNearby = Object.entries(nearbyData).map(([key, value]) => ({
            label: key, // Keeping the exact key as is
            distance: `${value}`,
          }));

          setNearby(formattedNearby);
        })
        .catch((error) => {
          console.error("Error fetching nearby locations:", error);
        });
    }
  }, [id]);

  return (
    <>
      <h5 className="title fw-6">What’s nearby?</h5>
     
      <div className="row box-nearby">
        {nearby.length > 0 ? (
          nearby.map((item, index) => (
            <div className="col-md-5" key={index}>
              <ul className={index % 2 === 0 ? "box-left" : "box-right"}>
                <li className="item-nearby">
                  <span className="fw-7" style={{width: '170px'}}>{item.label}:</span>
                  <span className="label">{item.distance}</span>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p>No nearby amenities listed.</p>
        )}
      </div>
    </>
  );
}
