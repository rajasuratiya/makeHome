import React from "react";
import Link from "next/link";

export default function TeamMembers() {
  const teamMembers = [
    {
      id: 1,
      name: "Tarun Jindal",
      position: "Director",
      image: "/images/agents/tarunNew.jpeg",
      experience: "15+ Years",
      specialization: "Financial Advisor",
      phone: "+91 72908 05050",
      email: "tarun@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      },
      description: 'As Finance Director, Mr. Tarun Jindal ensures the company’s financial strategies align with its broader business objectives. He plays a vital role in evaluating the effectiveness of ongoing plans, programs, and initiatives to meet evolving business needs. Mr. Jindal provides strategic decision-making support through detailed financial analysis and business intelligence. He also oversees key functions including financial planning, research, customer service, and the monitoring of invoice payments—ensuring operational efficiency and the achievement of financial targets.'
    },
    {
      id: 2,
      name: "Kapil Andhiwal",
      position: "Director",
      image: "/images/agents/kapilNew.jpeg",
      experience: "15+ Years",
      specialization: "Operations Director",
      phone: "+91 98731 84692",
      email: "kapil@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      },
      description: 'As Operations Director, Mr. Kapil Andhiwal plays a key role in managing day-to-day operations while driving the company’s long-term strategic goals. He specializes in identifying high-potential property investment opportunities, analyzing tax implications, and staying ahead of current real estate market trends. Mr. Andhiwal ensures the accuracy and completeness of all project documentation, including contracts, permits, change orders, and other essential records, maintaining the highest standards of compliance and operational efficiency.\n'
    },
    {
      id: 5,
      name: "Varun Jindal",
      position: "Director",
      image: "/images/agents/varunNew.jpeg",
      experience: "15+ Years",
      specialization: "Sales Director",
      phone: "+91 88604 60544",
      email: "varun@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      },
      description: 'As Sales Director, Mr. Varun Jindal leads the development and execution of sales strategies to drive revenue growth and achieve business targets. He is responsible for identifying key markets, setting clear sales objectives, and aligning marketing initiatives to support business development. Mr. Jindal places a strong emphasis on client relationship management, ensuring high levels of customer satisfaction and fostering long-term partnerships and referrals. He directs the company’s overall sales approach, ensuring consistent performance and market competitiveness.\n'
    },
    {
      id: 3,
      name: "Ajay Gupta",
      position: "Mentor & Investor",
      image: "/images/agents/ajay.jpg",
      experience: "20+ Years",
      specialization: "Investment Properties",
      phone: "+91 98100 59491",
      email: "",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      },
      description: 'Mr. Ajay Gupta serves as a trusted Mentor and Investor, offering strategic guidance and visionary leadership to the company. With extensive experience in business development, investment management, and the pharmaceutical industry, he brings a unique and valuable perspective to the team. His background in pharmacy enhances his ability to assess opportunities with a focus on innovation, compliance, and sustainable growth. Mr. Gupta plays a key role in high-level decision-making, risk analysis, and market strategy—helping shape the company’s long-term success. His mentorship continues to inspire a culture of excellence, integrity, and forward-thinking leadership.'
    },
    // {
    //   id: 4,
    //   name: "Upender Singh",
    //   position: "Commercial Property Expert",
    //   image: "/images/agents/upender.jpg",
    //   experience: "8+ Years",
    //   specialization: "Commercial Real Estate",
    //   phone: "+91 98765 43213",
    //   email: "upender@makemyhomez.com",
    //   social: {
    //     facebook: "#",
    //     linkedin: "#",
    //     twitter: "#"
    //   }
    // },
    {
      id: 6,
      name: "Vernit Choudhary",
      position: "GM Sales Manager",
      image: "/images/agents/vernit.jpg",
      experience: "7+ Years",
      // specialization: "First-time Buyers",
      phone: "+91 73039 37783",
      email: "info@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 7,
      name: "Ritika Choudhary",
      position: "Senior Sales Manager",
      image: "/images/agents/ritikaNew.jpeg",
      experience: "6+ Years",
      // specialization: "First-time Buyers",
      phone: "+91 73020 37362",
      email: "info@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 8,
      name: "Kunal Kulshrestha",
      position: "Assistant GM Sales",
      image: "/images/agents/kunalNew.jpeg",
      experience: "5+ Years",
      // specialization: "First-time Buyers",
      phone: "+91 76786 17195",
      email: "info@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 9,
      name: "Neha Bhasin",
      position: "Assistant GM Sales",
      image: "/images/agents/nehaNew.jpeg",
      experience: "10+ Years",
      // specialization: "First-time Buyers",
      phone: "+91 95824 42477",
      email: "info@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 10,
      name: "Shivam Bhatia",
      position: "Senior Sales Manager",
      image: "/images/agents/shivamNew.jpeg",
      experience: "5+ Years",
      // specialization: "First-time Buyers",
      phone: "+91 93190 48384",
      email: "info@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 11,
      name: "Shivam Prajapati",
      position: "Digital Marketing Manager",
      image: "/images/agents/shivamPrajapatiNew.jpeg",
      experience: "4+ Years",
      // specialization: "First-time Buyers",
      phone: "+91 70421 77083",
      email: "marketing@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 13,
      name: "Gaurav Tonger",
      position: "Social Media Manager",
      image: "/images/agents/gauravNew.jpeg",
      experience: "4+ Years",
      // specialization: "First-time Buyers",
      phone: "+91 95608 60495",
      email: "marketing@makemyhomez.in",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <section className="flat-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="box-title text-center">
              <div className="text-subtitle text-primary">Our Team</div>
              <h3 className="mt-12">Meet Our Professional Team</h3>
              <p className="body-1 text-variant-1 mt-12">
                Our experienced team of real estate professionals is dedicated to providing you with exceptional service
              </p>
            </div>
          </div>
        </div>
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member-detail-section py-5 border-bottom">
            <div className="row align-items-start">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <img src={member.image} alt={member.name} className="w-100 rounded" />
              </div>
              <div className="col-lg-8">
                <h2>{member.name}</h2>
                <p className="text-primary text-1 mt-2">{member.position}</p>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div>
                      <h6>Experience</h6>
                      <p className="text-variant-1">{member.experience}</p>
                    </div>
                  </div>
                  {member.specialization && <div className="col-md-6">
                    <div>
                      <h6>Specialization</h6>
                      <p className="text-variant-1">{member.specialization}</p>
                    </div>
                  </div>}
                </div>
                {member.description && <div className="mt-5">
                  <h6>About {member.name}</h6>
                  <p className="mt-2 text-variant-1">
                    {member.description}
                  </p>
                </div>}
                <div className="mt-5">
                  <h6>Get In Touch</h6>
                  <div className="contact-info mt-3">
                    <div className="contact-item d-flex align-items-center mb-3">
                      <div className="box-icon w-40 round mr-2">
                        <i className="icon icon-phone"></i>
                      </div>
                      <div>
                        <p className="text-variant-2 mb-0">Phone</p>
                        <a href={`tel:${member.phone}`} className="text-1">
                          {member.phone}
                        </a>
                      </div>
                    </div>
                    {member.email && <div className="contact-item d-flex align-items-center">
                      <div className="box-icon w-40 round mr-2">
                        <i className="icon icon-mail"></i>
                      </div>
                      <div>
                        <p className="text-variant-2 mb-0">Email</p>
                        <a href={`mailto:${member.email}`} className="text-1">
                          {member.email}
                        </a>
                      </div>
                    </div>}
                  </div>
                </div>
                <div className="mt-5 gap-3 flex-row d-flex">
                  <Link href="/contact" className="tf-btn primary size-1 mr-3">
                    Schedule Consultation <i className="icon icon-arr-r"></i>
                  </Link>
                  <Link href="/team" className="tf-btn btn-line size-1 ml-2">
                    Back to Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
