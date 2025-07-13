"use client"
import AddPropertyPost from "@/components/dashboard/AddPropertyPost";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import Header2 from "@/components/headers/Header2";
import { useParams } from "next/navigation";
import React from "react";

export default function EditPropertyPage() {  // More descriptive name
  const params = useParams();
  const id = params?.id; // Safe access with optional chaining

  if (!id) {
    return <div>Invalid property ID</div>; // Basic error handling
  }

  return (
    <>
      <div className="layout-wrap">
        <Header2 />
        <SidebarMenu />
        <AddPropertyPost id={id} />
        <div className="overlay-dashboard" />
      </div>
    </>
  );
}