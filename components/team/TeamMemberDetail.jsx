import React from "react";
import Link from "next/link";

export default function TeamMemberDetail({ member }) {
  if (!member) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <h3>Team Member Not Found</h3>
              <Link href="/team" className="tf-btn primary mt-20">
                Back to Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="flat-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="box-agent-detail">
              <div className="box-img">
                <img src={member.image} alt={member.name} className="w-100" />
              </div>
              <div className="agent-social-detail mt-30">
                <h6>Connect With Me</h6>
                <ul className="list-social mt-16">
                  <li>
                    <a href={member.social.facebook} className="box-icon w-40 social">
                      <i className="icon icon-fb"></i>
                    </a>
                  </li>
                  <li>
                    <a href={member.social.linkedin} className="box-icon w-40 social">
                      <i className="icon icon-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href={member.social.twitter} className="box-icon w-40 social">
                      <i className="icon icon-x"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="agent-detail-content">
              <h2>{member.name}</h2>
              <p className="text-primary text-1 mt-8">{member.position}</p>

              <div className="agent-info-grid mt-30">
                <div className="row">
                  <div className="col-md-6">
                    <div className="info-box">
                      <h6>Experience</h6>
                      <p className="text-variant-1">{member.experience}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box">
                      <h6>Specialization</h6>
                      <p className="text-variant-1">{member.specialization}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="agent-description mt-30">
                <h6>About {member.name}</h6>
                <p className="mt-12 text-variant-1">
                  {member.name} is a dedicated real estate professional with {member.experience} of experience
                  in the industry. Specializing in {member.specialization.toLowerCase()}, {member.name.split(' ')[0]}
                  has helped hundreds of clients achieve their real estate goals through expert guidance and
                  personalized service.
                </p>
                <p className="mt-16 text-variant-1">
                  With a deep understanding of the local market and a commitment to excellence, {member.name.split(' ')[0]}
                  provides comprehensive real estate services that exceed client expectations. Whether you're buying,
                  selling, or investing, you can trust {member.name.split(' ')[0]} to deliver results.
                </p>
              </div>

              <div className="contact-agent mt-40">
                <h6>Get In Touch</h6>
                <div className="contact-info mt-20">
                  <div className="contact-item">
                    <div className="box-icon w-40 round">
                      <i className="icon icon-phone"></i>
                    </div>
                    <div className="content">
                      <p className="text-variant-2">Phone</p>
                      <a href={`tel:${member.phone}`} className="text-1">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                  <div className="contact-item mt-20">
                    <div className="box-icon w-40 round">
                      <i className="icon icon-mail"></i>
                    </div>
                    <div className="content">
                      <p className="text-variant-2">Email</p>
                      <a href={`mailto:${member.email}`} className="text-1">
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box-btn mt-40">
                <Link href="/contact" className="tf-btn primary size-1">
                  Schedule Consultation
                  <i className="icon icon-arr-r"></i>
                </Link>
                <Link href="/team" className="tf-btn btn-line size-1 ml-16">
                  Back to Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
