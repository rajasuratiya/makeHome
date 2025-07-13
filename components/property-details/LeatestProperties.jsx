"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {BASE_URL} from "@/app/api/constants";

export default function LatestProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL +"/api/project");
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setProperties(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h5 className="fw-6 title">Latest Properties</h5>
      <ul>
        {properties.slice(0, 5).map((property, index) => (
          <li key={index} className="latest-property-item">
            <Link
              href={`/project/${property.slug}`}
              className="images-style"
            >
              <div
                style={{
                  width: "615px",
                  height: "405px",
                  overflow: "hidden",
                }}
              >
                <Image
                  alt="Property Image"
                  src={property.images[0]?.url || "/default-image.jpg"}
                  width={615}
                  height={405}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                />
              </div>
            </Link>
            <div className="content">
              <div className="text-capitalize text-btn">
                <Link
                  href={`/project/${property.slug}`}
                  className="link"
                >
                  {property.name.slice(0, 20) || "No Description"}
                </Link>
              </div>
              <ul className="meta-list mt-6">
                <li className="item">
                  <i className="icon icon-date" />
                  <span className="text-variant-1">Date:</span>
                  <span className="fw-2">{property.createdAt.slice(0, 10)}</span>
                </li>
                {/* <li className="item">
                  <i className="icon icon-bath" />
                  <span className="text-variant-1">Baths:</span>
                  <span className="fw-6">{property.overview?.baths || 0}</span>
                </li>
                <li className="item">
                  <i className="icon icon-sqft" />
                  <span className="text-variant-1">Sqft:</span>
                  <span className="fw-6">{property.overview?.sqft || 0}</span>
                </li> */}
              </ul>
              {/* <div className="mt-10 text-btn">
                ${property.price.toLocaleString()}
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
