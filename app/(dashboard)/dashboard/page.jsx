"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import Header2 from "@/components/headers/Header2";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default function Page() {
  // const router = useRouter();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProtected = async () => {
  //     try {
  //       const res = await fetch('/api/protected');
  //       // If the API returns a 401 status, it means the user is not authenticated.
  //       if (res.status === 401) {
  //         router.push('/login'); // Redirect to your login page
  //         return;
  //       }
  //       // You can also process the data if needed:
  //       // const json = await res.json();
  //       // setData(json);
  //     } catch (error) {
  //       console.error("Error fetching protected data:", error);
  //       // On error, optionally redirect the user
  //       router.push('/login');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProtected();
  // }, [router]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="layout-wrap">
      <Header2 />
      <SidebarMenu />
     
      <Dashboard />
      <div className="overlay-dashboard" />
    </div>
  );
}
