"use client";
import React, { useState } from "react";
import axios from "axios";
import DropdownSelect from "../common/DropdownSelect";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BASE_URL} from "@/app/api/constants";

export default function AddProperty() {
  // State for form data
  const [formData, setFormData] = useState({
    description: "",
    name: "",
    slug: "",
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
  const [isDragging, setIsDragging] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Add file validation and handling
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") || file.type === "application/pdf"
    );
    setAttachments((prev) => [...prev, ...validFiles]);
  };

  const deleteAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle basic input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle overview changes
  const handleOverviewChange = (index, field, value) => {
    const newOverview = [...formData.overview];
    newOverview[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      overview: newOverview,
    }));
  };

  // Add overview field
  const addOverviewField = () => {
    setFormData((prev) => ({
      ...prev,
      overview: [...prev.overview, { key: "", icon: "", value: "" }],
    }));
  };

  // Remove overview field
  const removeOverviewField = (index) => {
    setFormData((prev) => ({
      ...prev,
      overview: prev.overview.filter((_, i) => i !== index),
    }));
  };

  // Add amenity field
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

  // Add new map details field
  const addMapDetailsField = () => {
    setFormData((prev) => ({
      ...prev,
      mapDetails: [...prev.mapDetails, { key: "", value: "" }],
    }));
  };

  // Remove map details field
  const removeMapDetailsField = (index) => {
    setFormData((prev) => ({
      ...prev,
      mapDetails: prev.mapDetails.filter((_, i) => i !== index),
    }));
  };

  // Handle what's nearby changes
  const handleNearbyChange = (index, field, value) => {
    const newNearby = [...formData.whatsNearby];
    newNearby[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      whatsNearby: newNearby,
    }));
  };

  // Add what's nearby field
  const addNearbyField = () => {
    setFormData((prev) => ({
      ...prev,
      whatsNearby: [...prev.whatsNearby, { key: "", value: "" }],
    }));
  };

  // Remove what's nearby field
  const removeNearbyField = (index) => {
    setFormData((prev) => ({
      ...prev,
      whatsNearby: prev.whatsNearby.filter((_, i) => i !== index),
    }));
  };

  // Handle amenities changes
  const handleAmenityChange = (index, value) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData((prev) => ({
      ...prev,
      amenities: newAmenities,
    }));
  };

  // Handle floor data changes
  const handleFloorChange = (index, field, value) => {
    const newFloors = [...floors];
    newFloors[index][field] = value;
    setFloors(newFloors);
  };

  // Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  // Gallery image uploads
  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages((prev) => [...prev, ...files]);
  };

  // Handle floor image upload
  const handleFloorImageChange = (index, e) => {
    const file = e.target.files[0];
    const newFloors = [...floors];
    newFloors[index].image = file;
    setFloors(newFloors);
  };

  // Add new floor
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

  // Remove floor
  const removeFloor = (index) => {
    setFloors((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Basic form data
      formDataToSend.append("description", formData.description);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("slug", formData.slug);
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

      const overviewData = {};
      formData.overview.forEach((item) => {
        if (overviewOptions[item.icon]) {
          overviewData[overviewOptions[item.icon]] = item.value;
        }
      });
      formDataToSend.append("overview", JSON.stringify(overviewData));
      formDataToSend.append(
        "whatsNearby",
        JSON.stringify(
          Object.fromEntries(
            formData.whatsNearby.map((item) => [item.key, item.value])
          )
        )
      );
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("contactEmail", formData.contactEmail);
      formDataToSend.append("amenities", JSON.stringify(formData.amenities));
      attachments.forEach((file) => {
        formDataToSend.append("attachments", file);
      });

      // Images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      // Gallery Images
      galleryImages.forEach((image) => {
        formDataToSend.append("galleryImages", image);
      });

      // Video
      formDataToSend.append("video", formData.videoUrl);

      // Floor Plans - Match API expectations
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

      // Floor Images - Use correct field name
      floors.forEach((floor, index) => {
        if (floor.image) {
          formDataToSend.append("floorPlanFiles", floor.image);
        }
      });

      const response = await axios.post(BASE_URL +"/api/project", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Property created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Failed to add property.", {
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

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // const availableAmenities = [
  //   "Swimming Pool",
  //   "Gym",
  //   "Parking",
  //   "Security",
  //   "Garden",
  //   "Playground",
  //   "BBQ Area",
  //   "Tennis Court",
  //   "Basketball Court",
  //   "Sauna",
  //   "Jacuzzi",
  //   "Pet Friendly",
  //   "24/7 Concierge"
  // ];

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
                    onChange={handleImageChange}
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
                    src={URL.createObjectURL(image)}
                    width={615}
                    height={405}
                  />
                  <span
                    type="button"
                    onClick={() => deleteImage(index)}
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
              {/* ////////////////////////// */}

              <div className="widget-box-2 mb-20">
                <h5 className="title">Map Details</h5>
                {formData.mapDetails.map((item, index) => (
                  <div key={index} className="box row g-3 align-items-center">
                    <fieldset className="col">
                      <label className="form-label"></label>
                      <input
                        placeholder="Title"
                        type="text"
                        className="form-control"
                        value={item.key}
                        onChange={(e) =>
                          handleMapDetailsChange(index, "key", e.target.value)
                        }
                      />
                    </fieldset>
                    <fieldset className="col">
                      <label className="form-label"></label>
                      <input
                        placeholder="Value"
                        type="text"
                        className="form-control"
                        value={item.value}
                        onChange={(e) =>
                          handleMapDetailsChange(index, "value", e.target.value)
                        }
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
                  <button
                    type="button"
                    onClick={addMapDetailsField}
                    className="btn-add-floor"
                  >
                    <span className="icon icon-plus"></span>
                  </button>
                </div>
                {/* ////////////////////// */}
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
                    onChange={handleGalleryImageChange}
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
                    src={URL.createObjectURL(image)}
                    width={615}
                    height={405}
                  />
                  <span
                    type="button"
                    onClick={() => deleteGalleryImage(index)}
                    className="icon icon-trash remove-file"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section - New */}
          {/* Overview Section */}
          <div className="widget-box-2 mb-20">
            <div className="flex justify-between items-center mb-4">
              <h5 className="title">Overview</h5>
            </div>

            {formData.overview.map((item, index) => (
              <div
                key={index}
                className="box row g-3 align-items-center position-relative"
              >
                <fieldset className="col">
                  <label className="form-label">Icon:</label>
                  <select
                    className="form-control"
                    value={item.icon}
                    onChange={(e) =>
                      handleOverviewChange(index, "icon", e.target.value)
                    }
                  >
                    <option value="" hidden>
                      Select an icon
                    </option>
                    <option value="house-line"> ID</option>
                    <option value="sliders-horizontal"> Type</option>
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
                    onChange={(e) =>
                      handleOverviewChange(index, "value", e.target.value)
                    }
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

            <button
              type="button"
              onClick={addOverviewField}
              className="btn-add-floor"
            >
              <span className="icon icon-plus"></span>
            </button>
          </div>

          {/* What's Nearby Section - New */}
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
                    onChange={(e) =>
                      handleNearbyChange(index, "key", e.target.value)
                    }
                  />
                </fieldset>
                <fieldset className="col">
                  <label className="form-label">Distance:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.value}
                    onChange={(e) =>
                      handleNearbyChange(index, "value", e.target.value)
                    }
                  />
                </fieldset>
                <div className="col-auto pt-4 ">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger p-3"
                    onClick={() => removeNearbyField(index)}
                  >
                    <Trash2 />
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center mt-3">
              <button
                type="button"
                onClick={addNearbyField}
                className="btn-add-floor"
              >
                <span className="icon icon-plus"></span>
              </button>
            </div>
          </div>

          {/* Amenities Section - New */}
          <div className="widget-box-2 mb-20">
            <div className="flex justify-between items-center mb-4">
              <h5 className="title">Amenities</h5>
            </div>
            {formData.amenities.map((amenity, index) => (
              <div
                key={index}
                className="position-relative mb-3 d-flex align-items-center gap-2"
              >
                <input
                  type="text"
                  className="form-control"
                  value={amenity}
                  onChange={(e) => handleAmenityChange(index, e.target.value)}
                  placeholder="Enter amenity"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger p-3 "
                  onClick={() => {
                    const newAmenities = formData.amenities.filter(
                      (_, i) => i !== index
                    );
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

            <button
              type="button"
              onClick={addAmenity}
              className="btn-add-floor"
            >
              <span className="icon icon-plus"></span>
            </button>
          </div>

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
              {attachments.map((file, index) => (
                <div key={index} className="relative p-4 border rounded ">
                  <div className="flex items-center">
                    {file.type.startsWith("image/") ? (
                      <div className="item-upload file-delete">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="attachment"
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                        <span
                          onClick={() => deleteAttachment(index)}
                          className="icon icon-trash p-4 "
                        />
                      </div>
                    ) : (
                      <div className="w-[100px] h-[100px] bg-gray-100 flex items-center justify-center">
                        PDF
                        <span
                          onClick={() => deleteAttachment(index)}
                          className="icon icon-trash p-4 "
                        />
                      </div>
                    )}
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
                value={formData.videoUrl}
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
                  <span
                    type="button"
                    onClick={() => removeFloor(index)}
                    className="icon icon-trash remove-file"
                  />
                </div>

                <fieldset className="box box-fieldset">
                  <label>Floor Name:</label>
                  <input
                    type="text"
                    className="form-control style-1"
                    value={floor.name}
                    onChange={(e) =>
                      handleFloorChange(index, "name", e.target.value)
                    }
                  />
                </fieldset>

                <div className="grid-2 box gap-30">
                  <fieldset className="box-fieldset">
                    <label>Floor Price:</label>
                    <input
                      type="number"
                      className="form-control style-1"
                      value={floor.floorPrice}
                      onChange={(e) =>
                        handleFloorChange(index, "floorPrice", e.target.value)
                      }
                    />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label>Price Postfix:</label>
                    <input
                      type="text"
                      className="form-control style-1"
                      value={floor.pricePostfix}
                      onChange={(e) =>
                        handleFloorChange(index, "pricePostfix", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleFloorChange(index, "floorSize", e.target.value)
                      }
                    />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label>Size Postfix:</label>
                    <input
                      type="text"
                      className="form-control style-1"
                      value={floor.sizePostfix}
                      onChange={(e) =>
                        handleFloorChange(index, "sizePostfix", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleFloorChange(index, "bedrooms", e.target.value)
                      }
                    />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label>Bathrooms:</label>
                    <input
                      type="number"
                      className="form-control style-1"
                      value={floor.bathrooms}
                      onChange={(e) =>
                        handleFloorChange(index, "bathrooms", e.target.value)
                      }
                    />
                  </fieldset>
                </div>

                <fieldset className="box-fieldset">
                  <label>Description:</label>
                  <textarea
                    className="textarea"
                    value={floor.description}
                    onChange={(e) =>
                      handleFloorChange(index, "description", e.target.value)
                    }
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
                </fieldset>
              </div>
            ))}

            <div className="text-center">
              <button
                type="button"
                onClick={addFloor}
                className="btn-add-floor"
              >
                <span className="icon icon-plus" />
              </button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="box-btn">
            <button type="submit" className="tf-btn primary" disabled={isSubmitting}
            style={{ filter: isSubmitting ? "opacity(50%)" : "none" }}>
              {isSubmitting ? "Adding Property..." : "Add Property"}
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
