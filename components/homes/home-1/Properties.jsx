"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DropdownSelect from "@/components/common/DropdownSelect";
import Link from "next/link";
import Image from "next/image";
import {BASE_URL} from "@/app/api/constants";

export default function Properties5() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(6);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(BASE_URL +"/api/project");
        const formattedData = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest date
          .map((property) => {
            let parsedAddress = "Unknown Address";
            try {
              parsedAddress = property.address
                ? JSON.parse(property.address).fullAddress
                : "Unknown Address";
            } catch (error) {
              console.error("Error parsing address:", property.address, error);
            }

            return {
              slug: property.slug,

              id: property.id,
              title: property.name,
              imgSrc: property.images?.[0]?.url || "/placeholder.jpg",
              address: parsedAddress,
              overview: property.overview ? Object.values(property.overview) : [],
              createdAt: property.createdAt, // Ensure this is available
            };
          });

        setProperties(formattedData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
}, []);


  const totalPages = Math.ceil(properties.length / itemPerPage);

  return (
    <>
      <section id="target-section"className="flat-section flat-recommended">
        <div className="container">
          <div className="box-title-listing">
            <div className="box-left">
              <h3 className="fw-8">Our Projects</h3>
            </div>
          </div>

          <div className="row">
            {properties
              .slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
              .map((property, i) => (
                <div
                  key={i}
                  className={
                    viewMode === "grid"
                      ? "col-xl-4 col-lg-6 col-md-6 col-sm-12"
                      : "col-12"
                  }
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    className={`homelengo-box ${
                      viewMode === "list" ? "list-style-1 line" : ""
                    }`}
                    style={{ width: "100%", maxWidth: "400px" }}
                  >
                    <div className="archive-top">
                      <Link
                        href={`/project/${property.slug}`}
                        className="images-group"
                      >
                        <div
                          className="images-style"
                          style={{ width: "100%", height: "250px", overflow: "hidden" }}
                        >
                          <Image
                            className="lazyload"
                            alt="property-image"
                            src={property.imgSrc}
                            width={400}
                            height={250}
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="archive-bottom">
                      <h6 className="text-capitalize">
                        <Link
                          href={`/project/${property.slug}`}
                          className="link text-line-clamp-1"
                        >
                          {property.title}
                        </Link>
                      </h6>
                      <span className="location">
                        <span className="text-line-clamp-1 px-0.5">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                              stroke="#A3ABB0"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                              stroke="#A3ABB0"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {property.address}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center">
            <a
              className="tf-btn btn-view primary size-1 hover-btn-view"
              href="project"
            >
              View All Properties<span className="icon icon-arrow-right2"></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
