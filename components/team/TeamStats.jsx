import React from "react";

export default function TeamStats() {
  const stats = [
    {
      number: "50+",
      label: "Expert Agents",
      description: "Professional real estate experts"
    },
    {
      number: "500+",
      label: "Happy Clients",
      description: "Satisfied customers served"
    },
    {
      number: "20+",
      label: "Years Experience",
      description: "Combined industry expertise"
    },
    {
      number: "600+",
      label: "Home Sold",
      description: "Successful transactions completed"
    }
  ];

  return (
    <section className="flat-section bg-surface">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="box-title text-center">
              <div className="text-subtitle text-primary">Our Achievements</div>
              <h3 className="mt-12">Numbers That Speak for Themselves</h3>
            </div>
          </div>
        </div>
        <div className="row mt-30">
          {stats.map((stat, index) => (
            <div key={index} className="col-xl-3 col-lg-6 col-md-6">
              <div className="counter-box text-center">
                <div className="box-icon w-80 round mx-auto mb-20">
                  <div className="icon icon-proven text-primary"></div>
                </div>
                <div className="content-box">
                  <h2 className="text-primary">{stat.number}</h2>
                  <h6 className="mt-8">{stat.label}</h6>
                  <p className="text-variant-1 mt-8">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
