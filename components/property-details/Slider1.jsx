"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Gallery, Item } from "react-photoswipe-gallery";
import {BASE_URL} from "@/app/api/constants";

export default function Slider1() {
  const { id } = useParams(); // Get project ID from URL
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchImages = async () => {
      try {
        const { data } = await axios.get(BASE_URL +`/api/project/${id}`);
        if (data?.images) {
          setImages(data.images);
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
  if (!images.length) return <p>No images available.</p>;

  return (
    <section className="flat-slider-detail-v2 flat-slider-wrap">
      <Gallery>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true, el: ".spb19" }}
          className="swiper tf-sw-location"
          navigation={{
            prevEl: ".pnbp1",
            nextEl: ".pnbn1",
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id || index} style={{ width: "400px", height: "75vh", overflow: "hidden" }}>
              <Item original={image.url} thumbnail={image.url} style={{ width: "100%", height: "100%" }}>
                {({ ref, open }) => (
                  <a
                    onClick={open}
                    data-fancybox="gallery"
                    className="box-img-detail d-block"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      ref={ref}
                      alt={`img-property-${index}`}
                      src={image.url}
                      width={1920}
                      height={1080}
                      style={{
                        objectPosition: "top",
                        objectFit: "cover",
                        width: "100%",
                        height: "70vh",
                        // Optional: Adds rounded corners
                      }}
                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}
          <div className="box-navigation">
            <div className="navigation swiper-nav-next nav-next-location pnbp1">
              <span className="icon icon-arr-l" />
            </div>
            <div className="navigation swiper-nav-prev nav-prev-location pnbn1">
              <span className="icon icon-arr-r" />
            </div>
          </div>
          <div className="sw-pagination spb18 sw-pagination-location text-center" />
        </Swiper>
      </Gallery>
    </section>
  );
}
