"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Description() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log("Fetching data for ID:", id); // Debugging

      axios
        .get(`/api/project/${id}`)
        .then((response) => {
          setDescription(response.data.description);
          setTitle(response.data.name);
        })
        .catch((error) => {
          console.error("Error fetching description:", error);
        });
    }
  }, [id]);

  return (
    <>
      <h1 className="fs-2 mb-8 text-black-2 fw-bold">{title}</h1>
      <h5 className="fw-6 title">Description</h5>
      <p className="text-variant-1" style={{ fontSize: "16px", lineHeight: "22px", letterSpacing: '1.5px' }}>
        {description || "Loading..."}
      </p>
    </>
  );
}
