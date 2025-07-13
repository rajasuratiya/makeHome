"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import BlogDetails from "@/components/blogs/BlogDetails";
import PageTitle from "@/components/blogs/PageTitle";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import {BASE_URL} from "@/app/api/constants";

// export const metadata = {
//   title: "Blog Details || Homelengo - Real Estate React Nextjs Template",
//   description: "Homelengo - Real Estate React Nextjs Template",
// };

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [blogItem, setBlogItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.back();
      return;
    }

    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(BASE_URL +`/api/blog/${id}`);
        if (!data) {
          router.back();
        } else {
          setBlogItem(data);
        }
      } catch (error) {
        console.error("Error fetching blog-backup:", error);
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  if (loading) return <p>Loading...</p>;
  if (!blogItem) return null; // Prevents rendering if router.back() is triggered

  return (
    <>
      <Header1 />
      <PageTitle />
      <BlogDetails blogItem={blogItem} />
      <Footer1 />
    </>
  );
}
