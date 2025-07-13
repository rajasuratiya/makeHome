import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useParams } from "next/navigation";
import Sidebar from "./Sidebar";
import Head from "next/head";
import {BASE_URL} from "@/app/api/constants";

export default function BlogDetails() {
  const [blogItem, setBlogItem] = useState(null);
  const { id } = useParams();
  const currentUrl = `http://localhost:3000/blog/${id}`; // Update this with your actual domain

  useEffect(() => {
    if (id) {
      axios
        .get(BASE_URL + `/api/blog/${id}`)
        .then((response) => {
          setBlogItem(response.data);
        })
        .catch((error) => {
          console.error("Error fetching blog-backup data:", error);
        });
    }
  }, [id]);

  if (!blogItem) {
    return <p>Loading...</p>;
  }

  // Extract metaJSON from the blog-backup item data
  const metaJSON = blogItem.metaJSON || {};
  console.log(metaJSON);

  const sharePost = (platform) => {
    let shareUrl = '';
    const title = encodeURIComponent(blogItem.title);
    const url = encodeURIComponent(currentUrl);

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'x':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'instagram':
            // Instagram doesn't support direct web sharing like this.
            // We'll open the base URL and alert the user as a fallback.
            shareUrl = 'https://www.instagram.com/';
            alert('Instagram sharing is not supported directly via web. Please copy the URL and share it manually.');
            break;
        default:
            console.error('Unsupported platform:', platform);
            return false;
    }

    // Open the share window with dynamic centering
    const width = 800;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    window.open(shareUrl, 'share', `width=${width},height=${height},top=${top},left=${left}`);
    return false;
};

  return (
    <>
      <head>
        {Object.entries(metaJSON).map(([key, value], index) => (
          <meta key={index} name={key} content={value} />
        ))}
      </head>
      <section className="flat-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="flat-blog-detail">
                <div className="mb-30 pb-30 line-b">
                  <h3 className="title fw-8">{blogItem.title}</h3>
                </div>
                <div className="pb-30 line-b">
                  <div>
                    <p className="text-black fw-8">{blogItem.description}</p>
                  </div>
                  <div className="markdown-content">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        strong: ({ node, ...props }) => (
                          <strong
                            className="fs-5 fw-bold text-highlight"
                            {...props}
                          />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="fst-italic" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="blockquote text-primary "
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-20 fs-7" {...props} />
                        ),
                        h1: ({ node, ...props }) => (
                          <h1
                            className="fs-5 mb-16 text-black-2 fw-bold"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="fs-5 mb-16 text-black-2 fw-bold"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="fs-5 mb-16 text-black-2 fw-bold"
                            {...props}
                          />
                        ),
                        img: ({ node, ...props }) => (
                          <div className="my-30 round-30 o-hidden">
                            <Image
                              className="lazyload w-100"
                              {...props}
                              width={840}
                              height={473}
                            />
                          </div>
                        ),
                        br: () => <br />,
                      }}
                    >
                      {blogItem.contentMarkdown
                        .replace(/\r\n/g, "\n")
                        .replace(/\n\n/g, "\n\n")
                        .replace(/\n/g, "\n\n")}
                    </Markdown>
                  </div>
                </div>
                <div className="mt-16 d-flex justify-content-between flex-wrap gap-16">
                  <div className="d-flex flex-wrap align-items-center gap-12">
                    <span className="text-black fw-6">Tags:</span>
                    <ul className="d-flex flex-wrap gap-9">
                      {blogItem.tags.map((tag, index) => (
                        <li key={index}>
                          <a href="#" className="blog-tag">
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="d-flex flex-wrap align-items-center gap-12">
                    <span className="font-rubik text-variant-">Share this post:</span>
                    <ul className="d-flex flex-wrap gap-9">
                      <li>
                        <a href="#" onClick={() => sharePost('facebook')} className="box-icon icon icon-fb line w-44 round" />
                      </li>
                      <li>
                        <a href="#" onClick={() => sharePost('x')} className="box-icon icon icon-x line w-44 round" />
                      </li>
                      <li>
                        <a href="#" onClick={() => sharePost('linkedin')} className="box-icon icon icon-in line w-44 round" />
                      </li>
                      <li>
                        <a href="#" onClick={() => sharePost('instagram')} className="box-icon icon icon-instargram line w-44 round" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
