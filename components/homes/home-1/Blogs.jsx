"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import {BASE_URL} from "@/app/api/constants";

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/api/blog")
      .then((response) => {
        const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogPosts(sortedBlogs);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);


  return (
    <section className="flat-section bg-primary-new">
      <div className="container">
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Latest News</div>
          <h3 className="title mt-4">From Our Blog</h3>
        </div>
        <Swiper
          className="swiper tf-sw-latest wow fadeInUp"
          data-wow-delay=".2s"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 15 },
            576: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spb7" }}
        >
          {blogPosts.map((post) => (
            <SwiperSlide className="swiper-slide" key={post.id}>
              <Link href={`/blog/${post.slug}`} className="flat-blog-item hover-img">
                <div className="img-style" style={{ width: "100%", height: "250px", overflow: "hidden" }}>
                  <Image
                    className="lazyload"
                    src={post.thumbnail?.url || "/default-image.jpg"}
                    alt={post.title || "Blog Image"}
                    width={615}
                    height={405}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                  <span className="date-post">{post.createdAt ? post.createdAt.split("T")[0] : "N/A"}</span>
                </div>
                <div className="content-box">
                  {/* <div className="post-author">
                    <span className="fw-6">{post.author || "Unknown"}</span>
                    <span>{post.category || "Uncategorized"}</span>
                  </div> */}
                  <h5 className="title link">{post.title || "No Title"}</h5>
                  <p className="description">
                    {post.description ? (post.description.length > 100 ? post.description.slice(0, 100) + "..." : post.description) : "No Description"}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          <div className="sw-pagination spb7 sw-pagination-latest text-center" />
        </Swiper>
      </div>
      <div className="text-center m-5">
            <a
              className="tf-btn btn-view primary size-1 hover-btn-view"
              href="/blogs"
            >
              View All Blogs<span className="icon icon-arrow-right2"></span>
            </a>
          </div>
    </section>
  );
}
