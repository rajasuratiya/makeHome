"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Features() {
  const { id } = useParams();
  const [amenities, setAmenities] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/project/${id}`)
        .then((response) => {
          try {
            const rawAmenities = response.data.amenities || [];
            // Convert stringified arrays into proper arrays
            const parsedAmenities = rawAmenities.map((item) => JSON.parse(item));
            setAmenities(parsedAmenities.flat()); // Flatten the array of arrays
            distributeAmenities(parsedAmenities.flat());
          } catch (error) {
            console.error("Error parsing amenities:", error);
            setAmenities([]);
            setList1([]);
            setList2([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching amenities:", error);
        });
    }
  }, [id]);

  const distributeAmenities = (amenities) => {
    const list1 = [];
    const list2 = [];
    amenities.forEach((amenity, index) => {
      if (index % 2 === 0) {
        list1.push(amenity);
      } else {
        list2.push(amenity);
      }
    });
    setList1(list1);
    setList2(list2);
  };

  return (
    <>
      <h5 className="title fw-6">Amenities and Features</h5>
      <div className="wrap-feature" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {list1.length > 0 || list2.length > 0 ? (
          <>
            <div className="box-feature">
              <ul>
                {list1.map((feature, idx) => (
                  <li className="feature-item" key={idx}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="box-feature">
              <ul>
                {list2.map((feature, idx) => (
                  <li className="feature-item" key={idx}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="box-feature">
            <ul>
              <li>Loading amenities...</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}