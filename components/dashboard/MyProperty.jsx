"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        const sortedProjects = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(sortedProjects);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="main-content">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="wrapper-content row">
          <div className="col-xl-9">
            <div className="widget-box-2 wd-listing">
              <h5 className="title">New Listing</h5>
              <div className="wrap-table" style={{ maxHeight: "700px", overflowY: "auto" }}>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Listing</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProjects.map((project) => (
                        <tr key={project.id} className="file-delete">
                          <td>
                            <div className="listing-box" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div className="images" style={{ width: "150px", height: "100px", overflow: "hidden", borderRadius: "5px" }}>
                                <Image
                                  alt="Project Image"
                                  src={project.thumbnail?.url || "/default.jpg"}
                                  width={615}
                                  height={405}
                                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                />
                              </div>
                              <div className="content">
                                <div className="title">
                                <Link href={`/project/${project.id}`} className="link">
                                    {project.title.length > 40 ? `${project.description.slice(0, 40)}...` : project.description}
                                  </Link>
                                </div>
                                <div className="text-date">
                                  Posting date: {new Date(project.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <ul className="list-action">
                              <li>
                                <Link href={`/add-blog/${project.id}`} className="item">
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016"
                                      stroke="#A3ABB0"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <a
                                  className="remove-file item"
                                  onClick={() => handleDelete(project.id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568"
                                      stroke="#A3ABB0"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <ul className="pagination p-3">
                    <li onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                      <a className="nav-item p-3">
                        <i className="icon icon-arr-l" />
                      </a>
                    </li>

                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index + 1} className=" rounded-md">
                        <a
                          className={`nav-item p-3 page-box text-black rounded-md ${currentPage === index + 1 ? "bg-primary text-white" : ""}`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                      <a className="nav-item p-3">
                        <i className="icon icon-arr-r" />
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-3"></div>
        </div>
      </div>
      <div className="footer-dashboard">
        <p>Copyright © 2024 Home Lengo</p>
      </div>
    </div>
  );
}
