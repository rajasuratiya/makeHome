"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {BASE_URL} from "@/app/api/constants";

export default function MapLocation() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(BASE_URL +`/api/project/${id}`)
        .then((response) => setData(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [id]);

  if (!data) return <p>Loading...</p>;

  const { map, mapDetails } = data;

  // Modify the iframe HTML to ensure correct width and height
  const updatedMap = map.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="480"');

  return (
    <>
      <h5 className="title fw-6">Map location</h5>
      {map ? (
        <div
          className="map"
          dangerouslySetInnerHTML={{ __html: updatedMap }} // Render modified iframe
        />
      ) : (
        <p>Map could not be loaded.</p>
      )}
      <div className="info-map">
        <ul className="box-right">
          {mapDetails.details.map((detail, index) => (
            <li key={index}>
              <span className="label fw-6">{detail.key}</span>
              <div className="text text-variant-1">{detail.value}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
