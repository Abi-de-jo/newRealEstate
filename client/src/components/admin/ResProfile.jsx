import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProperty } from "../../utils/api";
import PuffLoader from "react-spinners/PuffLoader";
import { AiOutlineLeft, AiOutlineRight, AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import { FaShower, FaGlobe } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiShare } from "react-icons/fi";
import GoogleMapSection from "../../components/Map/GoogleMapSection";
import { Modal } from "@mantine/core";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const API_BASE_URL = "http://localhost:3000/api/residency";

function ResProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dModalOpen, setdModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPropertyDetailsOpen, setIsPropertyDetailsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data, isLoading, isError } = useQuery(["residency", id], () => getProperty(id));

  const [editFormData, setEditFormData] = useState({
    title: "",
    price: "",
    description: "",
    address: "",
    district: "",
    type: "",
    metro: "",
    images: [],
  });
  const [editdData, setdFormData] = useState({
    discount: "",
  });

  useEffect(() => {
    if (data) {
      setEditFormData({
        title: data.title || "",
        price: data.price || "",
        description: data.description || "",
        address: data.address || "",
        district: data.district || "",
        type: data.type || "",
        metro: data.metro || "",
        images: data.images || [],
      });
      setdFormData({
        discount: data.discount || "",
      });
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: data?.title || "Property",
          text: `Check out this amazing property: ${data?.title}`,
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setEditFormData((prev) => ({ ...prev, images: files }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...editFormData };
    try {
      await axios.put(`${API_BASE_URL}/update/${id}`, updatedData);
      alert("Property updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      alert("Property deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-500">Error while fetching data</span>
      </div>
    );
  }

  const images = data?.images || [];
  const roomImages = images.slice(1, 3).map((src) => ({ src, label: "" }));
  const video = data?.video;

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Image Section */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-full">
            {/* Main Carousel */}
            <div className="col-span-1 md:col-span-3 relative">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3000}
                onChange={setCurrentSlide}
                renderArrowPrev={(onClickHandler, hasPrev) =>
                  hasPrev && (
                    <button
                      onClick={onClickHandler}
                      className="absolute left-4 top-1/2 z-10 bg-white/80 rounded-full p-2"
                    >
                      <AiOutlineLeft size={24} />
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext) =>
                  hasNext && (
                    <button
                      onClick={onClickHandler}
                      className="absolute right-4 top-1/2 z-10 bg-white/80 rounded-full p-2"
                    >
                      <AiOutlineRight size={24} />
                    </button>
                  )
                }
              >
                {video && (
                  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                    <video
                      src={video}
                      className="object-cover w-full h-full rounded-lg"
                      autoPlay
                      loop
                      muted
                    />
                  </div>
                )}
                {images.map((src, index) => (
                  <div key={index} className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                    <img
                      src={src}
                      alt={`Property Image ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                ))}
              </Carousel>

              <div className="absolute bottom-4 left-4 z-10 md:col-7 flex items-center gap-4 min-[768px]:max-[1024px]:mb-8">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full"
                  onClick={handleShare}
                >
                  <FiShare className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
                  {currentSlide + 1}/{images.length + (video ? 1 : 0)}
                </span>
              </div>
            </div>

            {/* Room Thumbnails */}
            <div className="hidden md:flex md:col-span-1 flex-col gap-4">
              {roomImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-[190px] overflow-hidden rounded-lg min-[768px]:max-[1024px]:h-[150px]"
                >
                  <img
                    src={image.src}
                    alt={image.label}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
              {video && (
                <div className="relative h-[190px] overflow-hidden rounded-lg">
                  <video
                    src={video}
                    className="object-cover w-full h-full"
                    autoPlay
                    loop
                    muted
                  />
                </div>
              )}
            </div>

            {/* Form Section */}
         
         
         
            <div className="flex flex-col-reverse md:flex-row property-details mt-8">
      {/* Details Section */}
     
     
      <div className="  flexColStart md:hidden left w-full md:w-2/3">
        <div className="flexStart head">
          <span className="text-3xl font-bold text-gray-800">{data?.title}</span>
          <div className="flex items-center space-x-2">
            {data?.discount ? (
              <>
                <span className="text-gray-500 line-through text-lg">${data?.price}</span>
                <span className="text-orange-500 text-xl font-bold">${data?.discount}</span>
              </>
            ) : (
              <span className="text-orange-500 text-xl font-bold">${data?.price}</span>
            )}
          </div>
        </div>
        <span className="font-bold text-green-500">🟢 Property for {data?.type}</span>

        {/* Facilities Section */}
        <div className="flex flex-wrap gap-6 mt-4">
          <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
            <FaShower size={24} className="text-blue-500" />
            <span className="text-lg font-semibold text-gray-700">
              {data?.bathrooms} Bathroom
            </span>
          </div>
          <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
            <AiTwotoneCar size={24} className="text-blue-500" />
            <span className="text-lg font-semibold text-gray-700">
              {data?.parking} Parking
            </span>
          </div>
          <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
            <MdMeetingRoom size={24} className="text-blue-500" />
            <span className="text-lg font-semibold text-gray-700">
              {data?.rooms} Room
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <MdLocationPin size={25} />
          <span className="text-gray-600">
            {data?.address}, {data?.city}, {data?.country}
          </span>
        </div>
      </div>



      {/* Actions Section */}
      <div className="md:w-1/3 order-first md:order-none">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Property Actions</h2>
            <div className="space-y-4">
              <button
                className="w-full bg-blue-500 text-white rounded-full py-3 font-medium hover:bg-blue-600 transition-colors"
                onClick={() => setdModalOpen(true)}
              >
                Add Discount
              </button>
              <button
                className="w-full bg-yellow-500 text-white rounded-full py-3 font-medium hover:bg-yellow-600 transition-colors"
                onClick={() => setEditModalOpen(true)}
              >
                Edit Property
              </button>
              <button
                className="w-full bg-red-500 text-white rounded-full py-3 font-medium hover:bg-red-600 transition-colors"
                onClick={handleDelete}
              >
                Delete Property
              </button>
            </div>
          </div>
    </div>
    </div>



            
          </div>
        </div>

        {/* Property Details Section */}
        <div className=" flex flex-col   md:flex-row property-details mt-8">
          <div className="flexColStart -mt-[15px]  left w-full md:w-2/3">
            <div className="flexStart head">
              <span className="text-3xl font-bold text-gray-800">{data?.title}</span>
              <div className="flex items-center space-x-2">
                {data?.discount ? (
                  <>
                    <span className="text-gray-500 line-through text-lg">${data?.price}</span>
                    <span className="text-orange-500 text-xl font-bold">${data?.discount}</span>
                  </>
                ) : (
                  <span className="text-orange-500 text-xl font-bold">${data?.price}</span>
                )}
              </div>
            </div>
            <span className="font-bold text-green-500">🟢 Property for {data?.type}</span>

            {/* Facilities Section */}
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
                <FaShower size={24} className="text-blue-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {data?.bathrooms} Bathroom
                </span>
              </div>
              <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
                <AiTwotoneCar size={24} className="text-blue-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {data?.parking} Parking
                </span>
              </div>
              <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
                <MdMeetingRoom size={24} className="text-blue-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {data?.rooms} Room
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <MdLocationPin size={25} />
              <span className="text-gray-600">
                {data?.address}, {data?.city}, {data?.country}
              </span>
            </div>

            <div className="w-full mt-8">
              <div
                className="flex justify-between items-center py-4 border-b cursor-pointer"
                onClick={() => setIsPropertyDetailsOpen(!isPropertyDetailsOpen)}
              >
                <div className="flex items-center gap-2 w-full">
                  <FaGlobe size={20} />
                  <span className="font-bold">Property Details</span>
                </div>
                {isPropertyDetailsOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </div>

              {isPropertyDetailsOpen && (
                <div className="py-6 bg-white rounded-lg shadow-lg p-8 border border-gray-200 mt-4">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">
                    Property Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Bedrooms</h4>
                        <p className="text-gray-800">{data?.rooms || "N/A"}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Bathrooms</h4>
                        <p className="text-gray-800">{data?.bathrooms || "N/A"}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                          Parking
                        </h4>
                        <p className="text-gray-800">{data?.parking || "N/A"}</p>
                      </div>
                    </div>

                    <div className="col-span-2 p-3 bg-gray-50 rounded-lg shadow-md">
                      <h4 className="text-lg font-semibold text-gray-700 mb-4">Amenities</h4>
                      {data?.amenities?.length > 0 ? (
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
                          {data.amenities.map((amenity, index) => (
                            <li
                              key={index}
                              className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                              <span className="text-blue-500 text-lg">•</span>
                              <span className="ml-2 text-gray-800">{amenity}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No amenities available.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <GoogleMapSection
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>

        
      </div>

      {/* Edit Property Modal */}
      <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Property" centered>
        <form onSubmit={handleEditFormSubmit} className="space-y-4">
          {["title", "price", "description", "address", "district", "type", "metro"].map((field) => (
            <input
              key={field}
              type={["price"].includes(field) ? "number" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={editFormData[field]}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ))}
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </Modal>

      {/* Add Discount Modal */}
      <Modal opened={dModalOpen} onClose={() => setdModalOpen(false)} title="Add Discount" centered>
        <form onSubmit={handleEditFormSubmit} className="space-y-4">
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={editFormData.discount}
            onChange={handleEditInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ResProfile;

