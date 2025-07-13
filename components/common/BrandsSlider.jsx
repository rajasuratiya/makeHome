"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { partners } from "@/data/brands";

export default function BrandsSlider() {
  return (
    <div className="mt-20" style={{marginTop: '60px'}}>
    <Swiper
      className="swiper tf-sw-partner "
      slidesPerView={6}
      spaceBetween={15}
      loop
      modules={[Autoplay]}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}
      speed={500}
      breakpoints={{
        1024: { slidesPerView: 6, spaceBetween: 30 },
        768: { slidesPerView: 4, spaceBetween: 30 },
        575: { slidesPerView: 3, spaceBetween: 15 },
        0: { slidesPerView: 2, spaceBetween: 15 },
      }}
    >
      {partners.map((partner, index) => (
        <SwiperSlide key={index} className="swiper-slide">
          <div className="partner-item d-flex justify-content-center align-items-center h-100">
            <Image
              src={partner.src}
              width={120} // Set a consistent width
              height={60} // Set a consistent height
              alt={`Partner ${index + 1}`}
              style={{ objectFit: "contain", maxHeight: "60px" }} // Ensures logos don't stretch
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
}
