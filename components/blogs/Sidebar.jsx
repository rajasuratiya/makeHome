"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import {BASE_URL} from "@/app/api/constants";

export default function Sidebar() {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(BASE_URL + '/api/blog');
        const data = await response.json();
        // Assuming the API returns an array of posts and you want the latest 5
        const latestPosts = data.slice(0, 5);
        console.log(latestPosts)
        setRecentPosts(latestPosts);

      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <aside className="sidebar-blog fixed-sidebar">
      <div className="widget-box recent">
        <h5 className="text-black-2 text-capitalize">Featured listings</h5>
        <ul>
          {recentPosts.map((post, index) => (
            <li key={index}>
              <div className="recent-post-item not-overlay hover-img" >
                <Link href={`/blog/${recentPosts[index].slug}`} className="img-style" style={{ width: '112px', height: '74px' }}>
                  <Image
                    alt="post-recent"
                    src={post.thumbnail.url}
                    width={112}
                    height={74}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Link>
                <div className="content">
                  <Link href={`/blog/${recentPosts[index].slug}`} className="title link">
                    {post.title.slice(0,35)}
                  </Link>
                  <div className="subtitle">
                    <svg
                      width={16}
                      height={17}
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 2.5V4M11.5 2.5V4M2 13V5.5C2 5.10218 2.15804 4.72064 2.43934 4.43934C2.72064 4.15804 3.10218 4 3.5 4H12.5C12.8978 4 13.2794 4.15804 13.5607 4.43934C13.842 4.72064 14 5.10218 14 5.5V13M2 13C2 13.3978 2.15804 13.7794 2.43934 14.0607C2.72064 14.342 3.10218 14.5 3.5 14.5H12.5C12.8978 14.5 13.2794 14.342 13.5607 14.0607C13.842 13.7794 14 13.3978 14 13M2 13V8C2 7.60218 2.15804 7.22064 2.43934 6.93934C2.72064 6.65804 3.10218 6.5 3.5 6.5H12.5C12.8978 6.5 13.2794 6.65804 13.5607 6.93934C13.842 7.22064 14 7.60218 14 8V13"
                        stroke="#7C818B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{post.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
