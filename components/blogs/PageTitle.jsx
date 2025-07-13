'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BASE_URL} from "@/app/api/constants";

export default function PageTitle() {
  const [blogItem, setBlogItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(BASE_URL +`/api/blog/${id}`)
        .then(response => {
          setBlogItem(response.data);
          console.log('Blog data fetched:', response.data);
        })
        .catch(error => {
          console.error('Error fetching blog-backup data:', error);
        });
    }
  }, [id]);

  if (!blogItem) {
    return <p className="text-center fs-4 py-5">Loading...</p>;
  }

  return (
    <section className="position-relative w-100 px-3 px-md-5 mt-4 py-3">
      <div className="position-relative w-100 rounded overflow-hidden" style={{ height: '250px' }}>
        <Image
          className="img-fluid w-100 h-100 object-fit-cover"
          alt="Thumbnail"
          src={blogItem.thumbnail?.url || '/default-image.jpg'}
          layout="fill"
          priority
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center text-white text-center">
          <nav className="mb-2">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/blogs" className="text-white text-decoration-none">Latest Blogs</Link></li>


            </ul>
          </nav>

        </div>
      </div>
    </section>
  );
}
