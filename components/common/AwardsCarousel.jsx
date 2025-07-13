"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";

const awards = [
  "/images/award/award2.jpeg",
  "/images/award/award3.jpeg",
  "/images/award/award4.jpeg",
  "/images/award/award5.jpeg",
  "/images/award/award6.jpeg",
  "/images/award/award8.jpeg",
];

export default function AwardsCarousel() {
  return (
    <section className="flat-section bg-primary-new ">
      <div className="box-title px-15 wow fadeInUp">
        <div className="text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
          <div className="text-subtitle text-primary">Our Awards</div>
          <h3 className="title mt-4">Recognitions & Achievements</h3>
        </div>
      </div>
      <Swiper
        className="align-items-center justify-content-between "
        data-wow-delay=".2s"
        slidesPerView={4.5}
        loop={true}
        spaceBetween={30}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 15 },
          480: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1424: { slidesPerView: 4.5, spaceBetween: 30 },
        }}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true, el: ".spb-awards" }}
      >
        {awards.map((src, idx) => (
          <SwiperSlide className="swiper-slide justify-center" key={idx}>
            <div className="box-award-item d-flex flex-column align-items-center">
              <Image
                alt={`award-${idx+1}`}
                src={src}
                width={300}
                height={300}
                style={{
                  objectFit: "cover",
                  height: "300px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                  border: "2px solid #fff",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-pagination spb-awards sw-pagination-awards text-center" />
      </Swiper>
    </section>
  );
}
