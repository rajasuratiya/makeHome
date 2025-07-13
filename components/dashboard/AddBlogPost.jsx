"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Trash2, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogPostForm() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [metaFields, setMetaFields] = useState([{ key: "", value: "" }]);
  const [thumbnail, setThumbnail] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog-backup post');
        }

        const data = await response.json();

        setSlug(data.slug || "");

        setTitle(data.title || "");
        setDescription(data.description || "");
        setContentMarkdown(data.contentMarkdown || "");
        setTags(Array.isArray(data.tags) ? data.tags.join(",") : "");
        setCategories(Array.isArray(data.categories) ? data.categories.join(",") : "");

        if (data.metaJSON) {
          const metaEntries = Object.entries(data.metaJSON);
          if (metaEntries.length > 0) {
            setMetaFields(
              metaEntries.map(([key, value]) => ({ key, value }))
            );
          }
        }

        if (data.thumbnail) {
          setExistingThumbnail(data.thumbnail);
        }

      } catch (error) {
        console.error('Error fetching blog-backup post:', error);
        alert('Error loading blog-backup post data');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlogPost();
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Clean and validate meta fields
      const metaJSON = {};
      metaFields.forEach(({ key, value }) => {
        if (key && value) {
          metaJSON[key] = value;
        }
      });

      // Clean and validate tags and categories
      const cleanedTags = tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const cleanedCategories = categories
        .split(",")
        .map(cat => cat.trim())
        .filter(cat => cat.length > 0);

      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("contentMarkdown", contentMarkdown);
      formData.append("tags", JSON.stringify(cleanedTags));
      formData.append("categories", JSON.stringify(cleanedCategories));
      formData.append("metaJSON", JSON.stringify(metaJSON));

      // Handle thumbnail
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Explicitly indicate thumbnail removal
      formData.append("removeThumbnail", existingThumbnail === null ? "true" : "false");

      // First, let's log the data being sent
      console.log('Sending data:', {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        tags: cleanedTags,
        categories: cleanedCategories,
        metaJSON,
        removeThumbnail: existingThumbnail === null
      });

      const response = await fetch(`/api/blog/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Failed to update.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update blog-backup post');
      }
      if (response.ok) {
        toast.success("Updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }


      const result = await response.json();

      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setUpdating(false);
    }
  };

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

  const removeThumbnail = () => {
    setExistingThumbnail(null);
    setThumbnail(null);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <ToastContainer style={{ zIndex: 999999 }} />
      <div className="main-content-inner">
        <div className="container mt-4">
          <h2 className="mb-3">Edit Blog Post</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
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
              <label className="form-label">Slug*</label>
              <input
                type="text"
                className="form-control"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
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
              <SimpleMDE
                value={contentMarkdown}
                onChange={setContentMarkdown}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Meta JSON</label>
              {metaFields.map((field, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center gap-2 mb-2"
                >
                  <select
                    className="form-select w-25"
                    value={field.key}
                    onChange={(e) =>
                      handleMetaChange(index, e.target.value, field.value)
                    }
                  >
                    <option value="">Select Meta Field</option>
                    <option value="metaTitle">Meta Title</option>
                    <option value="metaDescription">Meta Description</option>
                    <option value="canonicalURL">Canonical URL</option>
                    <option value="metaKeywords">Meta Keywords</option>
                    <option value="robotTag">Robot Tag</option>
                    <option value="imageURL">Image URL</option>
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    value={field.value}
                    onChange={(e) =>
                      handleMetaChange(index, field.key, e.target.value)
                    }
                    placeholder="Enter value"
                  />
                  {index >= 0 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeMetaField(index)}
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={addMetaField}
              >
                Add Meta Field
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label">Thumbnail</label>
              {existingThumbnail ? (
                <div className="mb-3">
                  <div className="position-relative d-inline-block">
                    <Image
                      src={existingThumbnail.url}
                      alt="Current thumbnail"
                      width={200}
                      height={150}
                      className="rounded"
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                      onClick={removeThumbnail}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <small className="text-muted">
                      Uploaded on: {new Date(existingThumbnail.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ) : (
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  accept="image/*"
                />
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={updating}
            >
              {updating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
