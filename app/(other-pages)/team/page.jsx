import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import TeamHero from "@/components/team/TeamHero";
import TeamMembers from "@/components/team/TeamMembers";
import TeamStats from "@/components/team/TeamStats";
import React from "react";

export const metadata = {
  title: "Our Team | Make My Homez",
  description: "Meet Our Expert Team at Make My Homez - Dedicated Professionals Ready to Help You Find Your Dream Home",
};

export default function page() {
  return (
    <>
      <Header1 />
      <TeamHero />
      <TeamStats />
      <TeamMembers />
      {/*<Agents />*/}
      {/*<Brands />*/}
      {/*<Testimonials2 />*/}
      <Footer1 />
    </>
  );
}
