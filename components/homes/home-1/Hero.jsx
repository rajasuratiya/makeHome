"use client";
// import FilterTab from "@/components/common/FilterTab";
import WordEffect1 from "@/components/common/WordEffect1";
import Image from "next/image";

export default function Hero() {
  const scrollToSection = () => {
    document
      .getElementById("target-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      className="flat-slider home-1"
      style={{ backgroundImage: "url(/images/home/homepage-1.png)" }}
    >
      <div className="container relative">
        <div className="row">
          <div className="col-lg-12">
            <div className="slider-content">
              <div className="heading text-center">
                <div className="title-large text-white animationtext slide">
                  Find Your{" "}
                  <WordEffect1 string={["Dream Home", "Perfect Home"]} />
                </div>
                <p
                  className="subtitle text-white body-2 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  We are a real estate agency that will help you find the best
                  residence you dream of, let’s discuss for your dream house.
                </p>
              </div>
              {/* <FilterTab /> */}

              <div className="btn-more text-center text-white ">
                {/* <Image
                  className="cursor-pointer text-white "
                  src="drop.svg"
                  alt="drop"
                  width={60}
                  height={50}
                  onClick={scrollToSection}
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-arrow-down-circle-fill"
                  viewBox="0 0 16 16"
                  onClick={scrollToSection}
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay" />
    </section>
  );
}
