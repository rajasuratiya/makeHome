"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Gallery, Item } from "react-photoswipe-gallery";
import {BASE_URL} from "@/app/api/constants";

export default function Slider2() {
  const { id } = useParams(); // Get project ID from URL
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchImages = async () => {
      try {
        const { data } = await axios.get(BASE_URL +`/api/project/${id}`);
        if (data?.gallery) {
          setGallery(data.gallery);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!gallery.length) return <p>No images available.</p>;

  return (
    <Gallery>
      <section className="flat-slider-detail-v1 px-10">
        <Swiper
          className="swiper tf-sw-location"
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            1200: { slidesPerView: 2, spaceBetween: 10 }, // Desktop
            640: { slidesPerView: 2, spaceBetween: 10 }, // Tablet
            0: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spb18" }}
        >
          {gallery.map((image, index) => (
            <SwiperSlide key={image.id || index} style={{ width: "400px", height: "500px", overflow: "hidden" }}>
              <Item original={image.url} thumbnail={image.url} style={{ width: "100%", height: "100%" }}>
                {({ ref, open }) => (
                  <a onClick={open} data-fancybox="gallery" className="box-img-detail d-block" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                    <Image
                      ref={ref}
                      alt={`img-property-${index}`}
                      src={image.url}
                      width={400}
                      height={500}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px", // Optional: Adds rounded corners
                      }}
                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}
          <div className="sw-pagination spb18 sw-pagination-location text-center" />
        </Swiper>
      </section>
    </Gallery>
  );
}
