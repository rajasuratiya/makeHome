"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DropdownSelect from "../common/DropdownSelect";
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
        const response = await axios.get(BASE_URL+"/api/project");
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

              id: property.id,
              slug: property.slug,
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <section className="flat-section flat-recommended">
        <div className="container">
          <div className="box-title-listing">
            <div className="box-left">
              <h3 className="fw-8">Our Projects</h3>
              {/* <p className="text">There are currently {properties.length} properties.</p> */}
            </div>
            {/* <DropdownSelect
              onChange={(value) => {
                const match = value.match(/\d+/);
                if (match) {
                  setItemPerPage(parseInt(match[0], 10));
                  setCurrentPage(1);
                }
              }}
              addtionalParentClass="list-page"
              options={["Show: 6", "Show: 9", "Show: 12"]}
            /> */}
          </div>

          <div className="row">
            {properties
              .slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage)
              .map((property, i) => (
                <div key={i} className={viewMode === "grid" ? "col-xl-4 col-lg-6 col-md-6 col-sm-12" : "col-md-6 col-sm-12"}>
                  <div className={`homelengo-box ${viewMode === "list" ? "list-style-1 line" : ""}`}>
                    <div className="archive-top">
                      <Link href={`/project/${property.slug}`} className="images-group">
                        <div className="images-style" style={{ width: "100%", height: "250px", overflow: "hidden" }}>
                          <Image
                            className="lazyload img-fluid w-100"
                            alt="property-image"
                            src={property.imgSrc}
                            width={viewMode === "grid" ? 615 : 300}
                            height={viewMode === "grid" ? 405 : 250}
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="archive-bottom">
                      <h6 className="text-capitalize">
                        <Link href={`/project/${property.id}`} className="link text-line-clamp-1">
                          {property.title}
                        </Link>
                      </h6>
                      <span className="location">
                        <span className="text-line-clamp-1 px-0.5">
                          {property.address}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="col-12 text-center pt-26 line-t">
            <ul className="wd-navigation justify-content-center mt-20">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                <a className="nav-item ">
                        <i className="icon icon-arr-l" />
                      </a>
                </button>
              </li>
              {[...Array(totalPages).keys()].map((num) => (
                <li key={num} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
                  <a className={`nav-item ${currentPage === num + 1 ? "active" : ""}`} onClick={() => handlePageChange(num + 1)}>{num + 1}</a>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                <a className="nav-item ">
                        <i className="icon icon-arr-r" />
                      </a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
