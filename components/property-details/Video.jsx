"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Video() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/project/${id}`)
        .then((response) => {
          setVideoData(response.data.video || null);
        })
        .catch((error) => {
          console.error("Error fetching video data:", error);
        });
    }
  }, [id]);

  return (
    <div className="container-fluid mt-4 ">
      <h5 className="title fw-bold  flex justify-center items-center ">Video</h5>
      {videoData ? (
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-10 col-12">
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeID(videoData.url)}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading video...</p>
      )}
    </div>
  );
}

// Function to extract YouTube video ID from URL
function extractYouTubeID(url) {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.*\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
}