"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function FloorPlan() {
  const { id } = useParams();
  const [floorPlans, setFloorPlans] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/project/${id}`)
        .then(async (response) => {
          const plans = response.data.floorPlans || [];
          setFloorPlans(plans);

          // Fetch media URLs for each floor plan
          const imagePromises = plans.map((plan) =>
            axios
              .get(`/api/media/${plan.mediaId}`)
              .then((res) => ({ id: plan.mediaId, url: res.data.url }))
              .catch(() => ({ id: plan.mediaId, url: "/images/default.png" })) // Fallback image
          );

          const imagesData = await Promise.all(imagePromises);
          const imagesMap = imagesData.reduce((acc, item) => {
            acc[item.id] = item.url;
            return acc;
          }, {});

          setImages(imagesMap);
        })
        .catch((error) => {
          console.error("Error fetching floor plans:", error);
        });
    }
  }, [id]);

  return (
    <>
      <h5 className="title fw-6">Floor Plans</h5>
      <ul className="box-floor" id="parent-floor">
        {floorPlans.length > 0 ? (
          floorPlans.map((plan, index) => (
            <li className="floor-item" key={plan.id}>
              <div
                className= "floor-header"
                data-bs-target={`#floor-${plan.id}`}
                data-bs-toggle="collapse"
                aria-expanded= "true" 
                aria-controls={`floor-${plan.id}`}
              >
                <div className="inner-left">
                  <i className="icon icon-arr-r" />
                  <span className="text-btn">{`Floor ${plan.name}`}</span>
                </div>
                <ul className="inner-right">
                  <li className="d-flex align-items-center gap-8">
                    <i className="icon icon-bed" />
                    {plan.details.bedrooms} Bedroom
                  </li>
                  <li className="d-flex align-items-center gap-8">
                    <i className="icon icon-bath" />
                    {plan.details.bathrooms} Bathroom
                  </li>
                </ul>
              </div>
              <div
                id={`floor-${plan.id}`}
                className="collapse show"
                data-bs-parent="#parent-floor"
              >
                <div className="faq-body">
                  <div className="box-img">
                    <Image
                      alt="img-floor"
                      src={images[plan.mediaId] || "/images/default.png"}
                      width={1158}
                      height={815}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Loading floor plans...</p>
        )}
      </ul>
    </>
  );
}
