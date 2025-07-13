"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BASE_URL} from "@/app/api/constants";

export default function AddProperty({ id }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    address: "",
    zipCode: "",
    state: "",
    neighborhood: "",
    map: "",
    mapDetails: [{ key: "", value: "" }],
    contactNumber: "",
    contactEmail: "",
    videoUrl: "",
    overview: [{ key: "", icon: "", value: "" }],
    whatsNearby: [{ key: "", value: "" }],
    amenities: [""],
  });

  // State for files and images
  const [existingAttachments, setExistingAttachments] = useState([]); // Existing attachments from API
  const [attachments, setAttachments] = useState([]); // New attachments added by the user

  const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [floors, setFloors] = useState([
    {
      name: "",
      floorPrice: "",
      pricePostfix: "",
      floorSize: "",
      sizePostfix: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      image: null,
    },
  ]);

  useEffect(() => {
    if (id) {
      axios
        .get(BASE_URL+`/api/project/${id}`)
        .then((response) => {
          const data = response.data;

          const overviewOptions = {
            "house-line": "ID",
            "sliders-horizontal": "Type",
            garage: "Garages",
            bed1: "Bedrooms",
            bathtub: "Bathrooms",
            crop: "Landsize",
            hammer: "Year Built",
            ruler: "Size",
          };

          // Reverse mapping of keys to icons
          const reverseOverviewOptions = Object.fromEntries(
            Object.entries(overviewOptions).map(([icon, key]) => [key, icon])
          );

          // Convert overview object to array with icon mapping
          const overviewArray = Object.entries(data.overview).map(([key, value]) => ({
            key,
            icon: reverseOverviewOptions[key] || "",
            value: value,
          }));

          // Safely parse the amenities field
          let amenitiesArray = [];
          if (data.amenities && data.amenities.length > 0) {
            try {
              amenitiesArray = JSON.parse(data.amenities[0]);
            } catch (error) {
              console.error("Error parsing amenities:", error);
              // If parsing fails, fall back to splitting by comma
              amenitiesArray = data.amenities[0].split(",");
            }
          }

          setFormData({
            name: data.name,
            slug: data.slug,
            description: data.description,
            address: JSON.parse(data.address).fullAddress,
            zipCode: JSON.parse(data.address).zipCode,
            state: JSON.parse(data.address).state,
            neighborhood: JSON.parse(data.address).neighborhood,
            map: data.map,
            mapDetails: data?.mapDetails?.details || [] ,
            contactNumber: data.contactNumber,
            contactEmail: data.contactEmail,
            videoUrl: data?.video?.url || "",
            overview: overviewArray,
            whatsNearby: Object.entries(data.whatsNearby).map(([key, value]) => ({
              key,
              value,
            })),
            amenities: amenitiesArray,
          });

          // Set images from the fetched data
          setImages(data.images.map((image) => image.url));

          // Set gallery images from the fetched data
          setGalleryImages(data.gallery.map((image) => image.url));

          // Set attachments from the fetched data
          setExistingAttachments(
            data.attachment.map((attachment) => ({
              id: attachment.id,
              name: attachment.name,
              type: attachment.type,
              url: attachment.media?.url || null, // Preserve existing URLs
            }))
          );

          // Set floors from the fetched data
          const floorPlans = data.floorPlans.map((plan) => ({
            ...plan.details,
            name: plan.name,
            image: plan.media ? plan.media.url : null,
          }));
          setFloors(floorPlans);
        })
        .catch((error) => {
          console.error("Error fetching project data:", error);
        });
    }
  }, [id]);

  // Handlers for input changes and form submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOverviewChange = (index, field, value) => {
    const newOverview = [...formData.overview];
    newOverview[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      overview: newOverview,
    }));
  };

  const addOverviewField = () => {
    setFormData((prev) => ({
      ...prev,
      overview: [...prev.overview, { key: "", icon: "", value: "" }],
    }));
  };

  const removeOverviewField = (index) => {
    setFormData((prev) => ({
      ...prev,
      overview: prev.overview.filter((_, i) => i !== index),
    }));
  };

  const handleNearbyChange = (index, field, value) => {
    const newNearby = [...formData.whatsNearby];
    newNearby[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      whatsNearby: newNearby,
    }));
  };

  const addNearbyField = () => {
    setFormData((prev) => ({
      ...prev,
      whatsNearby: [...prev.whatsNearby, { key: "", value: "" }],
    }));
  };

  const removeNearbyField = (index) => {
    setFormData((prev) => ({
      ...prev,
      whatsNearby: prev.whatsNearby.filter((_, i) => i !== index),
    }));
  };

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData((prev) => ({
      ...prev,
      amenities: newAmenities,
    }));
  };

  const addAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, ""],
    }));
  };

  const handleMapDetailsChange = (index, field, value) => {
    const newMapDetails = [...formData.mapDetails];
    newMapDetails[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      mapDetails: newMapDetails,
    }));
  };

  const addMapDetailsField = () => {
    setFormData((prev) => ({
      ...prev,
      mapDetails: [...prev.mapDetails, { key: "", value: "" }],
    }));
  };

  const removeMapDetailsField = (index) => {
    setFormData((prev) => ({
      ...prev,
      mapDetails: prev.mapDetails.filter((_, i) => i !== index),
    }));
  };

  const handleFloorChange = (index, field, value) => {
    const newFloors = [...floors];
    newFloors[index][field] = value;
    setFloors(newFloors);
  };

  const addFloor = () => {
    setFloors((prev) => [
      ...prev,
      {
        name: "",
        floorPrice: "",
        pricePostfix: "",
        floorSize: "",
        sizePostfix: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
        image: null,
      },
    ]);
  };

  const removeFloor = (index) => {
    setFloors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleFloorImageChange = (index, e) => {
    const file = e.target.files[0];
    const newFloors = [...floors];
    newFloors[index].image = file;
    setFloors(newFloors);
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteAttachment = (index, isExisting) => {
    if (isExisting) {
      // Remove existing attachment from state
      setExistingAttachments((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remove newly added attachment
      setAttachments((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle file validation and handling
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/") || file.type === "application/pdf");
    setAttachments((prev) => [...prev, ...validFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Handle submit");
    try {
      const formDataToSend = new FormData();

      // Append form data
      formDataToSend.append("description", formData.description);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("map", formData.map || "");
      formDataToSend.append(
        "address",
        JSON.stringify({
          fullAddress: formData.address,
          state: formData.state,
          zipCode: formData.zipCode,
          neighborhood: formData.neighborhood,
        })
      );
      formDataToSend.append(
        "mapDetails",
        JSON.stringify({
          coordinates: formData.map,
          details: formData.mapDetails,
        })
      );

      // Mapping of icons to keys
      const overviewOptions = {
        "house-line": "ID",
        "sliders-horizontal": "Type",
        garage: "Garages",
        bed1: "Bedrooms",
        bathtub: "Bathrooms",
        crop: "Landsize",
        hammer: "Year Built",
        ruler: "Size",
      };

      // Construct overview data with specific keys
      const overviewData = {};
      formData.overview.forEach((item) => {
        if (overviewOptions[item.icon]) {
          overviewData[overviewOptions[item.icon]] = item.value;
        }
      });
      formDataToSend.append("overview", JSON.stringify(overviewData));
      formDataToSend.append(
        "whatsNearby",
        JSON.stringify(Object.fromEntries(formData.whatsNearby.map((item) => [item.key, item.value])))
      );
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("contactEmail", formData.contactEmail);
      formDataToSend.append("amenities", JSON.stringify(formData.amenities));

      // Append attachments
      // Send IDs of existing attachments
      // Send IDs of existing attachments for retention
      existingAttachments.forEach((file) => {
        formDataToSend.append("existingAttachments", file.url);
      });

      // Send new file uploads
      attachments.forEach((file) => {
        formDataToSend.append("attachments", file);
      });

      // Append images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      // Gallery Images
      galleryImages.forEach((image) => {
        formDataToSend.append("galleryImages", image);
      });

      // Append video URL
      formDataToSend.append("video", formData.videoUrl);

      // Append floor plans
      const floorPlansData = floors.map((floor) => ({
        name: floor.name,
        details: {
          price: floor.floorPrice,
          pricePostfix: floor.pricePostfix,
          size: floor.floorSize,
          sizePostfix: floor.sizePostfix,
          bedrooms: floor.bedrooms,
          bathrooms: floor.bathrooms,
          description: floor.description,
        },
      }));
      formDataToSend.append("floorPlans", JSON.stringify(floorPlansData));

      // Append floor plan images
      floors.forEach((floor, index) => {
        if (floor.image) {
          formDataToSend.append("floorPlanFiles", floor.image);
        }
      });

      let response;
      if (id) {
        // Update existing property
        response = await axios.put(BASE_URL +`/api/project/${id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new property
        response = await axios.post(BASE_URL +"/api/project", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("Updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
    } catch (error) {
      toast.error("Failed to update.", {
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
      <form onSubmit={handleSubmit}>
        <div className="main-content-inner">
          {/* Upload Media Section */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Upload Media</h5>
            <div className="box-uploadfile text-center">
              <div className="uploadfile">
                <label className="btn-upload tf-btn primary">
                  Select photos
                  <input
                    type="file"
                    className="ip-file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setImages((prev) => [...prev, ...files]);
                    }}
                  />
                </label>
                <p className="file-name">
                  or drag photos here <br />
                  <span>(Up to 10 photos)</span>
                </p>
              </div>
            </div>
            <div className="box-img-upload">
              {images.map((image, index) => (
                <div key={index} className="item-upload file-delete">
                  <Image
                    alt="preview"
                    src={image instanceof File ? URL.createObjectURL(image) : image}
                    width={615}
                    height={405}
                  />
                  <span
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                    className="icon icon-trash remove-file"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Information Section */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Information</h5>
            <div className="box-info-property">
              <div className="box  gap-30">
                <fieldset className="box box-fieldset">
                  <label>Name:</label>
                  <input
                    name="name"
                    className="form-control"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </div>

              <div className="box  gap-30">
                <fieldset className="box box-fieldset">
                  <label>Slug:</label>
                  <input
                    name="slug"
                    className="form-control"
                    type="text"
                    value={formData.slug}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </div>
              <fieldset className="box box-fieldset">
                <label>Description:</label>
                <textarea
                  name="description"
                  className="textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </fieldset>

              <div className="box grid-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    Full Address:<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>
                    Zip Code:<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-control"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </div>

              <div className="box grid-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    State:<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>Neighborhood:</label>
                  <input
                    type="text"
                    name="neighborhood"
                    className="form-control"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </div>

              <div className="box grid-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>Contact Number:</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    className="form-control"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>Contact Email:</label>
                  <input
                    type="email"
                    name="contactEmail"
                    className="form-control"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </div>

              <fieldset className="box box-fieldset">
                <label>Map Location:</label>
                <input
                  type="text"
                  name="map"
                  className="form-control"
                  value={formData.map}
                  onChange={handleInputChange}
                />
              </fieldset>
              {/* Map Details Section */}
              <div className="widget-box-2 mb-20">
                <h5 className="title">Map Details</h5>
                {formData.mapDetails.map((item, index) => (
                  <div key={index} className="box row g-3 align-items-center">
                    <fieldset className="col">
                      <label className="form-label"></label>
                      <input
                        type="text"
                        className="form-control"
                        value={item.key}
                        onChange={(e) => handleMapDetailsChange(index, "key", e.target.value)}
                      />
                    </fieldset>
                    <fieldset className="col">
                      <label className="form-label"></label>
                      <input
                        type="text"
                        className="form-control"
                        value={item.value}
                        onChange={(e) => handleMapDetailsChange(index, "value", e.target.value)}
                      />
                    </fieldset>
                    <div className="col-auto pt-4">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger p-3"
                        onClick={() => removeMapDetailsField(index)}
                      >
                        <Trash2 />
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="text-center mt-3">
                  <button type="button" onClick={addMapDetailsField} className="btn-add-floor">
                    <span className="icon icon-plus"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Upload Gallery</h5>
            <div className="box-uploadfile text-center">
              <div className="uploadfile">
                <label className="btn-upload tf-btn primary">
                  Select photos
                  <input
                    type="file"
                    className="ip-file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setGalleryImages((prev) => [...prev, ...files]);
                    }}
                  />
                </label>
                <p className="file-name">
                  or drag photos here <br />
                  <span>(Up to 10 photos)</span>
                </p>
              </div>
            </div>
            <div className="box-img-upload">
              {galleryImages.map((image, index) => (
                <div key={index} className="item-upload file-delete">
                  <Image
                    alt="preview"
                    src={image instanceof File ? URL.createObjectURL(image) : image}
                    width={615}
                    height={405}
                  />
                  <span
                    type="button"
                    onClick={() => setGalleryImages((prev) => prev.filter((_, i) => i !== index))}
                    className="icon icon-trash remove-file"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          <div className="widget-box-2 mb-20">
            <div className="flex justify-between items-center mb-4">
              <h5 className="title">Overview</h5>
            </div>

            {formData.overview.map((item, index) => (
              <div key={index} className="box row g-3 align-items-center position-relative">
                <fieldset className="col">
                  <label className="form-label">Icon:</label>
                  <select
                    className="form-control"
                    value={item.icon}
                    onChange={(e) => handleOverviewChange(index, "icon", e.target.value)}
                  >
                    <option value="">Select an icon</option>
                    <option value="house-line">ID</option>
                    <option value="sliders-horizontal">Type</option>
                    <option value="garage">Garages</option>
                    <option value="bed1">Bedrooms</option>
                    <option value="bathtub">Bathrooms</option>
                    <option value="crop">Landsize</option>
                    <option value="hammer">Year Built</option>
                    <option value="ruler">Size</option>
                  </select>
                </fieldset>

                <fieldset className="col">
                  <label className="form-label">Value:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.value}
                    onChange={(e) => handleOverviewChange(index, "value", e.target.value)}
                  />
                </fieldset>

                <div className="col-auto pt-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger p-3"
                    onClick={() => removeOverviewField(index)}
                  >
                    <Trash2 />
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            <button type="button" onClick={addOverviewField} className="btn-add-floor">
              <span className="icon icon-plus"></span>
            </button>
          </div>

          {/* What's Nearby Section */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">What's Nearby</h5>
            {formData.whatsNearby.map((item, index) => (
              <div key={index} className="box row g-3 align-items-center">
                <fieldset className="col">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.key}
                    onChange={(e) => handleNearbyChange(index, "key", e.target.value)}
                  />
                </fieldset>
                <fieldset className="col">
                  <label className="form-label">Distance:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.value}
                    onChange={(e) => handleNearbyChange(index, "value", e.target.value)}
                  />
                </fieldset>
                <div className="col-auto pt-4">
                  <button type="button" className="btn btn-sm btn-danger p-3" onClick={() => removeNearbyField(index)}>
                    <Trash2 />
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center mt-3">
              <button type="button" onClick={addNearbyField} className="btn-add-floor">
                <span className="icon icon-plus"></span>
              </button>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="widget-box-2 mb-20">
            <div className="flex justify-between items-center mb-4">
              <h5 className="title">Amenities</h5>
            </div>
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="position-relative mb-3 d-flex align-items-center gap-2">
                <input
                  type="text"
                  className="form-control"
                  value={amenity}
                  onChange={(e) => handleAmenityChange(index, e.target.value)}
                  placeholder="Enter amenity"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger p-3"
                  onClick={() => {
                    const newAmenities = formData.amenities.filter((_, i) => i !== index);
                    setFormData((prev) => ({
                      ...prev,
                      amenities: newAmenities,
                    }));
                  }}
                >
                  <Trash2 />
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}

            <button type="button" onClick={addAmenity} className="btn-add-floor">
              <span className="icon icon-plus"></span>
            </button>
          </div>

          {/* Attachments Section */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Attachments</h5>
            <div className="box-uploadfile text-center">
              <div className="uploadfile">
                <label className="btn-upload tf-btn primary">
                  Select Files
                  <input
                    type="file"
                    className="ip-file"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleAttachmentChange}
                  />
                </label>
                <p className="file-name">
                  or drag files here
                  <br />
                  <span>(PDF or DOC)</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {existingAttachments.map((file, index) => (
                <div key={`existing-${index}`} className="relative p-4 border rounded">
                  <div className="flex items-center">
                    {file.type.startsWith("image/") ? (
                      <div className="item-upload file-delete">
                        <Image
                          src={file instanceof File ? URL.createObjectURL(file) : "/path/to/default/image.png"}
                          alt="attachment"
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                        <span
                          onClick={() => deleteAttachment(index, true)}
                          className="icon icon-trash p-5 cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center">
                        PDF
                        <span
                          onClick={() => deleteAttachment(index, true)}
                          className="icon icon-trash p-5 cursor-pointer"
                        />
                      </div>
                    )}
                    <span className="ml-2 truncate">{file.name}</span>
                  </div>
                </div>
              ))}

              {attachments.map((file, index) => (
                <div key={`new-${index}`} className="relative p-4 border rounded">
                  <div className="flex items-center">
                    {file.type.startsWith("image/") ? (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="attachment"
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center">PDF</div>
                    )}
                    <span
                      onClick={() => deleteAttachment(index, false)}
                      className="icon icon-trash p-4 cursor-pointer"
                    />
                    <span className="ml-2 truncate">{file.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Video</h5>
            <fieldset className="box-fieldset">
              <label>Video URL:</label>
              <input
                type="text"
                name="videoUrl"
                className="form-control"
                value={formData?.videoUrl || ""}
                onChange={handleInputChange}
                placeholder="Youtube, vimeo url"
              />
            </fieldset>
          </div>

          {/* Floors Section */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Floors</h5>
            {floors.map((floor, index) => (
              <div key={index} className="box-floor-property file-delete">
                <div className="top d-flex justify-content-between align-items-center">
                  <h6>Floor {index + 1}:</h6>
                  <span type="button" onClick={() => removeFloor(index)} className="icon icon-trash remove-file" />
                </div>

                <fieldset className="box box-fieldset">
                  <label>Floor Name:</label>
                  <input
                    type="text"
                    className="form-control style-1"
                    value={floor.name}
                    onChange={(e) => handleFloorChange(index, "name", e.target.value)}
                  />
                </fieldset>

                <div className="grid-2 box gap-30">
                  <fieldset className="box-fieldset">
                    <label>Floor Price:</label>
                    <input
                      type="number"
                      className="form-control style-1"
                      value={floor.floorPrice}
                      onChange={(e) => handleFloorChange(index, "floorPrice", e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label>Price Postfix:</label>
                    <input
                      type="text"
                      className="form-control style-1"
                      value={floor.pricePostfix}
                      onChange={(e) => handleFloorChange(index, "pricePostfix", e.target.value)}
                    />
                  </fieldset>
                </div>

                <div className="grid-2 box gap-30">
                  <fieldset className="box-fieldset">
                    <label>Floor Size:</label>
                    <input
                      type="number"
                      className="form-control style-1"
                      value={floor.floorSize}
                      onChange={(e) => handleFloorChange(index, "floorSize", e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label>Size Postfix:</label>
                    <input
                      type="text"
                      className="form-control style-1"
                      value={floor.sizePostfix}
                      onChange={(e) => handleFloorChange(index, "sizePostfix", e.target.value)}
                    />
                  </fieldset>
                </div>

                <div className="grid-2 box gap-30">
                  <fieldset className="box-fieldset">
                    <label>Bedrooms:</label>
                    <input
                      type="number"
                      className="form-control style-1"
                      value={floor.bedrooms}
                      onChange={(e) => handleFloorChange(index, "bedrooms", e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label>Bathrooms:</label>
                    <input
                      type="number"
                      className="form-control style-1"
                      value={floor.bathrooms}
                      onChange={(e) => handleFloorChange(index, "bathrooms", e.target.value)}
                    />
                  </fieldset>
                </div>

                <fieldset className="box-fieldset">
                  <label>Description:</label>
                  <textarea
                    className="textarea"
                    value={floor.description}
                    onChange={(e) => handleFloorChange(index, "description", e.target.value)}
                  />
                </fieldset>

                <fieldset className="box-fieldset">
                  <label>Floor Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFloorImageChange(index, e)}
                    className="form-control"
                  />
                  {floor.image && (
                    <div className="floor-image-preview">
                      <Image
                        src={floor.image instanceof File ? URL.createObjectURL(floor.image) : floor.image}
                        alt={`Floor ${index + 1} Image`}
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                </fieldset>
              </div>
            ))}

            <div className="text-center">
              <button type="button" onClick={addFloor} className="btn-add-floor">
                <span className="icon icon-plus" />
              </button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="box-btn">
            <button
              type="submit"
              className="tf-btn primary"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.5 : 1 }}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
            {/* <button type="button" className="tf-btn btn-line">
              Save & Preview
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
