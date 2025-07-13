"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {BASE_URL} from "@/app/api/constants";

export default function Blogs2() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  useEffect(() => {
    axios
      .get(BASE_URL + "/api/blog")
      .then((response) => {
        const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedBlogs);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <section className="flat-section">
      <div className="container">
        <div className="row">
          {currentBlogs.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.id}>
              <Link href={`/blog/${post.slug}`} className="flat-blog-item hover-img">
                <div className="img-style" style={{ width: "100%", height: "250px", overflow: "hidden" }}>
                  <Image
                    className="lazyload"
                    src={post.thumbnail?.url || "/default-image.jpg"}
                    alt={post.title}
                    width={615}
                    height={405}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                  <span className="date-post">{post.createdAt ? post.createdAt.split("T")[0] : "N/A"}</span>
                </div>
                <div className="content-box">
                  <h5 className="title link">
                    {post.title ? (post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title) : "No Title"}
                  </h5>
                  <p className="description">
                    {post.description ? (post.description.length > 100 ? post.description.slice(0, 100) + "..." : post.description) : "No Description"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="col-12 text-center pt-26 line-t">
          <ul className="wd-navigation mt-20 justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}> <a className="nav-item ">
                        <i className="icon icon-arr-l" />
                      </a></button>
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
  );
}
