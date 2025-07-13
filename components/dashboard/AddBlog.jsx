"use client";

import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Trash2 } from "lucide-react";

export default function BlogPostForm() {
  const [title, setTitle] = useState("");
  const [slug,setslug] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [metaFields, setMetaFields] = useState([{ key: "", value: "" }]); // Only one field initially
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMetaChange = (index, key, value) => {
    const updatedMeta = [...metaFields];
    updatedMeta[index] = { key, value };
    setMetaFields(updatedMeta);
  };

  const addMetaField = () => {
    setMetaFields([...metaFields, { key: "", value: "" }]);
  };

  const removeMetaField = (index) => {
    const updatedMeta = metaFields.filter((_, i) => i !== index);
    setMetaFields(updatedMeta);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const metaJSON = {};
    metaFields.forEach(({ key, value }) => {
      if (key) metaJSON[key] = value;
    });

    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("contentMarkdown", contentMarkdown);
    formData.append("tags", JSON.stringify(tags.split(",")));
    formData.append("categories", JSON.stringify(categories.split(",")));
    formData.append("metaJSON", JSON.stringify(metaJSON));
    if (thumbnail) formData.append("thumbnail", thumbnail);

    const response = await fetch("/api/blog", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {

      toast.success("Created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
    } else {
      toast.error("Failed to create blog-backup.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-content">
      <ToastContainer style={{ zIndex: 999999 }} />
      <div className="main-content-inner">
        <div className="container mt-4">
          <h2 className="mb-3">Create Blog Post</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow ">
            <div className="mb-3">
              <label className="form-label">Title*</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">slug*</label>
              <input
                type="text"
                className="form-control"
                value={slug}
                onChange={(e) => setslug(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tags (comma-separated)</label>
              <input type="text" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Description*</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Categories (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Content Markdown*</label>
              {typeof window !== "undefined" && typeof document !== "undefined" && (
                <SimpleMDE value={contentMarkdown} onChange={setContentMarkdown} />
              )}
            </div>

            {/* Meta JSON Fields */}
            <div className="mb-3">
              <label className="form-label">Meta JSON</label>
              {metaFields.map((field, index) => (
                <div key={index} className="d-flex align-items-center gap-2 mb-2">
                  <select
                    className="form-select w-25"
                    value={field.key}
                    onChange={(e) => handleMetaChange(index, e.target.value, field.value)}
                  >
                    <option value="">Select Meta Field</option>
                    <option value="title">Meta Title</option>
                    <option value="description">Meta Description</option>
                    <option value="canonical">Canonical URL</option>
                    <option value="keywords">Meta Keywords</option>
                    <option value="author">Author Tag</option>
                    <option value="og:image">Image URL</option>
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    value={field.value}
                    onChange={(e) => handleMetaChange(index, field.key, e.target.value)}
                    placeholder="Enter value"
                  />
                  {index >= 0 && (
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => removeMetaField(index)}>
                      <Trash2 />
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-sm btn-secondary" onClick={addMetaField}>
                Add Meta Field
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label">Thumbnail</label>
              <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} />
            </div>

            <button type="submit" className="btn btn-primary">
             {isSubmitting ? "Creating..." : "Create Blog "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
