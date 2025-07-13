"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
// import DetailsTitle1 from "@/components/project/DetailsTitle1";
import PropertyDetails from "@/components/property-details/PropertyDetails";
import Slider1 from "@/components/property-details/Slider1";
import {BASE_URL} from "@/app/api/constants";

// export const metadata = {
//   title: "Property Details 01 || Homelengo - Real Estate React Nextjs Template",
//   description: "Homelengo - Real Estate React Nextjs Template",
// };

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [propertyItem, setPropertyItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.back();
      return;
    }

    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(BASE_URL+`/api/project/${id}`);
        if (!data) {
          router.back();
        } else {
          setPropertyItem(data);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, router]);

  if (loading) return <p>Loading...</p>;
  if (!propertyItem) return null; // Prevents rendering if router.back() is triggered

  return (
    <>
      <Header1 />
      <Slider1 />
      <PropertyDetails />
      <Footer1 />
    </>
  );
}
