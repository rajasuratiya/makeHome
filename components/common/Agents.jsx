"use client";
import { agents2 } from "@/data/agents";
import React from "react";
import Image from "next/image";

export default function Agents() {
  // Split the agents array: first 3 for row 1, next 2 for row 2
  const firstRowAgents = agents2.slice(0, 3);
  const secondRowAgents = agents2.slice(3, 5);

  return (
    <section className="flat-section flat-agents">
      <div className="container">
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Our Teams</div>
          <h3 className="title mt-4">Meet Our Directors</h3>
        </div>

        {/* First row - 3 images */}
        <div className="row mb-4">
          {firstRowAgents.map((agent) => (
            <div key={agent.id} className="col-md-4 col-sm-12 mb-4">
              <div
                className="box-agent hover-img wow fadeInUp justify-center"
                style={{ animationDelay: agent.wowDelay }}
              >
                <div
                  className="box-img img-style position-relative"
                  style={{
                    width: "100%",
                    paddingTop: "100%", // Makes a perfect square that scales with width
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    alt={`image-agent-${agent.name}`}
                    src={agent.imgSrc}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <div className="content" style={{ alignItems: "flex-start" }}>
                    <div className="">
                      <h5>
                        <a>{agent.name}</a>
                      </h5>
                      <p className="text-variant-1">{agent.title}</p>
                    </div>
                    <div className="box-icon mt-2">
                      <a href={`tel:${agent.phone}`}>
                        <span className="icon icon-phone" />
                      </a>
                      <a href={`mailto:${agent.email}`}>
                        <span className="icon icon-mail" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <p
                      className="desc"
                      style={{ fontSize: "13px", marginTop: "0.5rem", lineHeight: "1.3rem", textAlign: "center" }}
                    >
                      {agent.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row - 2 centered images */}
        <div className="row">
          <div className="col-md-2 d-none d-md-block"></div> {/* Spacer for centering */}
          {secondRowAgents.map((agent) => (
            <div key={agent.id} className="col-md-4 col-sm-6 mb-4">
              <div
                className="box-agent hover-img wow fadeInUp justify-center"
                style={{ animationDelay: agent.wowDelay }}
              >
                <div
                  className="box-img img-style position-relative"
                  style={{
                    width: "100%",
                    paddingTop: "100%", // Makes a perfect square that scales with width
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    alt={`image-agent-${agent.name}`}
                    src={agent.imgSrc}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="content">
                  <div className="">
                    <h5>
                      <a>{agent.name}</a>
                    </h5>
                    <p className="text-variant-1">{agent.title}</p>
                  </div>
                  <div className="box-icon">
                    <a href={`tel:${agent.phone}`}>
                      <span className="icon icon-phone" />
                    </a>
                    <a href={`mailto:${agent.email}`}>
                      <span className="icon icon-mail" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-2 d-none d-md-block"></div> {/* Spacer for centering */}
        </div>
      </div>
    </section>
  );
}
