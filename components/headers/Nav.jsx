"use client";
import { menuItems } from "@/data/menu";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {BASE_URL} from "@/app/api/constants";

export default function Nav() {
  const pathname = usePathname();
  const [finalItems, setFinalItems] = useState([...menuItems]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(BASE_URL +"/api/project");
        if (response.data) {
          setFinalItems((prev) => {
            for (const item of prev) {
              if (item.title === "Projects") {
                console.log("yes found");
                // delete item["link"];
                item["dropdown"] = true;
                item["links"] = response.data
                  .filter((e) => e.name && e.slug)
                  .map((e) => ({
                    label: e.name,
                    href: `/project/${e.slug}`,
                  }));
              }
            }
            console.log("prev is", prev);
            return [...prev];
          });
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);
  return (
    <>
      {finalItems.map((item, index) => (
        <>
          {item.dropdown && item?.links ? (
            <li
              key={index}
              className={`dropdown2 ${
                item.links.some((el) => el.href.split("/")[1] == pathname.split("/")[1]) ? "current" : ""
              }`}
            >
              <a href={item.link} style={{ textDecoration: "none" }}>
                {item.title}
              </a>
              {/*<a>{item.title}</a> We also need click ability*/}
              <ul>
                <div style={{ maxHeight: "60vh", overflow: "auto" }}>
                  {item.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className={
                        link.href.split("/")[2] == pathname.split("/")[2]?.replaceAll("%20", " ") ? "current" : ""
                      }
                    >
                      <Link style={{ textDecoration: "none" }} href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>

              <div className="dropdown2-btn"></div>
            </li>
          ) : (
            <li
              key={index}
              className={`${
                (item.link.includes(pathname) && pathname !== "/") || (pathname === "/" && item.link === pathname)
                  ? "current"
                  : ""
              }`}
            >
              <a href={item.link} style={{ textDecoration: "none" }}>
                {item.title}
              </a>
            </li>
          )}
        </>
      ))}
    </>
  );
}
