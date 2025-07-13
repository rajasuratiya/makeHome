"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import TeamMemberDetail from "@/components/team/TeamMemberDetail";
import TeamHero from "@/components/team/TeamHero";

export default function TeamMemberPage() {
  const { id } = useParams();
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // Team members data (in a real app, this would come from an API)
  const teamMembers = [
    {
      id: 1,
      name: "Tarun Jindal",
      position: "CEO & Founder",
      image: "/images/agents/Tarun Jindal.png",
      experience: "15+ Years",
      specialization: "Luxury Properties",
      phone: "+91 98765 43210",
      email: "tarun@makemyhomez.com",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Kapil Sharma",
      position: "Senior Property Consultant",
      image: "/images/agents/Kapil2.jpg",
      experience: "12+ Years",
      specialization: "Residential Sales",
      phone: "+91 98765 43211",
      email: "kapil@makemyhomez.com",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: "Ajay Kumar",
      position: "Property Investment Advisor",
      image: "/images/agents/ajay.jpg",
      experience: "10+ Years",
      specialization: "Investment Properties",
      phone: "+91 98765 43212",
      email: "ajay@makemyhomez.com",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 4,
      name: "Upender Singh",
      position: "Commercial Property Expert",
      image: "/images/agents/upender.jpg",
      experience: "8+ Years",
      specialization: "Commercial Real Estate",
      phone: "+91 98765 43213",
      email: "upender@makemyhomez.com",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 5,
      name: "Varun Gupta",
      position: "Property Manager",
      image: "/images/agents/varun.jpg",
      experience: "7+ Years",
      specialization: "Property Management",
      phone: "+91 98765 43214",
      email: "varun@makemyhomez.com",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 6,
      name: "Vernit Sharma",
      position: "Real Estate Consultant",
      image: "/images/agents/vernit.jpg",
      experience: "6+ Years",
      specialization: "First-time Buyers",
      phone: "+91 98765 43215",
      email: "vernit@makemyhomez.com",
      social: {
        facebook: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  useEffect(() => {
    if (!id) {
      router.push('/team');
      return;
    }

    const foundMember = teamMembers.find(m => m.id === parseInt(id));
    setMember(foundMember);
    setLoading(false);
  }, [id, router]);

  if (loading) {
    return (
      <>
        <Header1 />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer1 />
      </>
    );
  }

  return (
    <>
      <Header1 />
      <TeamHero />
      <TeamMemberDetail member={member} />
      <Footer1 />
    </>
  );
}
