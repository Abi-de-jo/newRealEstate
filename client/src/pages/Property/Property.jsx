import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getAllProperties, getProperty } from "../../utils/api";
import PuffLoader from "react-spinners/PuffLoader";
import { AiTwotoneCar, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import { FaShower, FaGlobe } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiShare } from "react-icons/fi";
import "./Property.css";
import GoogleMapSection from "../../components/Map/GoogleMapSection";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Neighborhood from "../../components/NeighbourMap";
import Related from "../../components/Related";

export const Property = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () => getProperty(id));
  const [modalOpened, setModalOpened] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false);
  const [isPropertyDetailsOpen, setIsPropertyDetailsOpen] = useState(false);
  const { user } = useAuth0();
  const email = localStorage.getItem("email");
  const getTimeDifference = (updatedAt) => {
    const now = new Date();
    const updatedTime = new Date(updatedAt);
    const diffInMs = now - updatedTime;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours >= 24) {
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return diffInHours === 1 ? "1hr ago" : `${diffInHours}hrs ago`;
    } else if (diffInMinutes > 0) {
      return diffInMinutes === 1 ? "1min ago" : `${diffInMinutes} mins ago`;
    } else {
      return diffInSeconds === 1 ? "1sec ago" : `${diffInSeconds}secs ago`;
    }
  };
  const telegramBaseUrlTele = "https://t.me/agent_abi_bot";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile view if screen width is less than 768px
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener
    };
  }, []);


  const username = (() => {
    const userProfile = localStorage.getItem(
      "userProfile_abisheikabisheik102@gmail.com"
    );
    try {
      return userProfile ? JSON.parse(userProfile) : null;
    } catch (error) {
      console.error("Error parsing user profile:", error);
      return null;
    }
  })();

  const { data: currentProperty } = useQuery(["resd", id], () => getProperty(id));

  // Fetching all properties for related property filtering
  const { data: allProperties} = useQuery("allProperties", getAllProperties);

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

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  const handleTele = () => {
    const telegramBaseUrl = "https://t.me/agent_abi_bot";
  
    // Default user message
    const userName = user?.name || "User";
    const defaultMessage = `Hello Agent, I'm ${userName}, and I'm interested in this property.`;
  
    // Constructing the formatted message
    const formattedMessage = `
  🚨 *New Property Inquiry!* 🚨
  
  📄 **User Details**:
  - **Email**: ${user?.email || "Not provided"}
  
  🏠 **Property Details**:
  - **Title**: ${data?.title || "N/A"}
  - **Price**: 💰 ${data?.price || "N/A"}
  - **Description**: 📝 ${data?.description || "N/A"}
  - **Address**: 📍 ${data?.address || "N/A"}
  - **District**: ${data?.district || "N/A"}
  - **Type**: ${data?.type || "N/A"}
  - **Metro**: 🚇 ${data?.metro || "N/A"}
  
  🖼 **Images**:
  ${data?.images?.map((img, index) => `${index + 1}️⃣ ${img}`).join("\n") || "No images available"}
  
  💬 **User Message**:
  ${defaultMessage}
  
  🔔 *Please review and take necessary action.*
    `;
  
    // Construct Telegram URL
    const telegramUrl = `${telegramBaseUrl}?text=${encodeURIComponent(formattedMessage)}`;
  
    // Open Telegram with the constructed URL
    window.open(telegramUrl, "_blank");
  
   
  };
  



  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const telegramBaseUrl = "https://t.me/agent_abi_bot";
    
  
    // Constructing the formatted message
    const formattedMessage = `
  🚨 *New Property Inquiry!* 🚨
  
  📄 **User Details**:
  - **Email**: ${user?.email || "Not provided"}
  
  🏠 **Property Details**:
  - **Title**: ${data?.title || "N/A"}
  - **Price**: 💰 ${data?.price || "N/A"}
  - **Description**: 📝 ${data?.description || "N/A"}
  - **Address**: 📍 ${data?.address || "N/A"}
  - **District**: ${data?.district || "N/A"}
  - **Type**: ${data?.type || "N/A"}
  - **Metro**: 🚇 ${data?.metro || "N/A"}
   
  🖼 **Images**:
  ${data?.images?.map((img, index) => `${index + 1}️⃣ ${img}`).join("\n") || "No images available"}
  
  🔔 *Please review and take necessary action.*
    `;
  
    const telegramUrl = `${telegramBaseUrl}?text=${encodeURIComponent(formattedMessage)}`;
  
    // Redirect user to the Telegram bot
    window.open(telegramUrl, "_blank");
  
    // Log details for debugging purposes
    console.log("User Email:", user?.email);
    console.log("Property ID:", id);
  };
  

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching</span>
        </div>
      </div>
    );
  }

  const images = data?.images || [];
  const roomImages = [
    { src: data?.images[1], label: "" },
    { src: data?.images[2], label: "" },
    ];

  const video = data?.video;




  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Image Section */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="bg-blue-500 text-white text-sm font-bold px-2 w-28 p-2 text-center rounded">
              {getTimeDifference(data.updatedAt)}
            </span>
          </div>

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
        src={data?.video}
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
                  className="flex items-center gap-2 px-4 py-2 bg-white/80  backdrop-blur-sm rounded-full"
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
            <div className="hidden md:flex md:col-span-1 flex-col gap-4 ">
              {roomImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-[190px] overflow-hidden rounded-lg  min-[768px]:max-[1024px]:h-[150px] "
                >
                  <img
                    src={image.src}
                    alt={image.label}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-2 left-2 text-white font-medium">
                    {image.label}
                  </div>
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

            <div>
              {/* Email Agent Button */}



              <div>
                {/* Display the raw form for larger screens */}
                {!isMobile && (
                  <div className="bg-white rounded-2xl p-6 max-w-md w-[400px] shadow-lg col-span-2 row-span-1">
                    <h2 className="text-2xl font-bold mb-6">More about this property</h2>
                    <form className="space-y-4">
                      <div className="space-y-1">
                        <label className="block text-sm">
                          Full name<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Name"
                          defaultValue={username?.username}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm">
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Email address"
                          defaultValue={email}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm">
                          Phone<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-400 focus:outline-none"
                        />
                      </div>

                      <button
  type="submit"
  onClick={handleFormSubmit}

  className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-800 transition-colors"
>
  <a
    href={`https://t.me/agent_abi_bot?start=propertyId=${id}&userEmail=${user?.email || "unknown"}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Email here..
  </a>
</button>


                    </form>
                  </div>
                )}

                {/* Display the modal for mobile screens */}
                {isMobile && (
                  <div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-black text-white rounded-full py-3  font-medium hover:bg-gray-800 transition-colors "
                    >
                      Email Agent
                    </button>

                    {/* Modal */}
                    {isModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                          <h2 className="text-2xl font-bold mb-6">More about this property</h2>
                          <form className="space-y-4">
                            <div className="space-y-1">
                              <label className="block text-sm">
                                Full name<span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Name"
                                defaultValue={username?.username}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-400 focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-sm">
                                Email<span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                placeholder="Email address"
                                defaultValue={email}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-400 focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-sm">
                                Phone<span className="text-red-500">*</span>
                              </label>
                              <input
                                type="tel"
                                placeholder="Phone number"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-400 focus:outline-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-800 transition-colors"
                            >
                              <a href="https://t.me/Chriwane_uniq">Email here..</a>
                            </button>
                          </form>

                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 w-full bg-gray-300 text-black rounded-full py-2 hover:bg-gray-400"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>












            </div>







          </div>





        </div>

        {/* Property Details Section */}
        <div className="flex flex-col md:flex-row property-details mt-8">
          <div className="flexColStart left w-full md:w-1/2 lg:w-2/3">
            <div className="flexStart head lg:-mt-10 ">
              <span className="primaryText">{data?.title}</span>
              <div className="flex items-center space-x-2">
                {data?.discount ? (
                  <>
                    <span className="text-gray-500 line-through text-lg">${data?.price}</span>
                    <span className="orangeText text-xl font-bold">${data?.discount}</span>
                  </>
                ) : (
                  <span className="orangeText text-xl">${data?.price}</span>
                )}
              </div>
            </div>
            <span className="font-bold"><span>🟢</span>  Property for {data?.type}</span>

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
              <span className="secondaryText">
                {data?.address}, {data?.city}, {data?.country}
              </span>
            </div>

            <div className="flex gap-3 mt-7">
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
                onClick={handleTele}
              >
                Write to Telegram
              </button>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all duration-300"
                onClick={() => {
                  if (email) {
                    setModalOpened(true);
                  } else {
                    alert("You must be signed in to contact on Telegram.");
                  }
                }}
              >
                Write to Whatsapp
              </button>
            </div>

            <BookingModal
              opened={modalOpened}
              propertyId={id}
              email={user?.email}
              setOpened={setModalOpened}
            />
            <div className="col-span-2 w-full">
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
                <div className="py-6 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">
                    Property Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column - Property Information */}
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

                    {/* Right Columns - Amenities */}
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

              <div
                className="flex justify-between w-full items-center py-4 border-b cursor-pointer"
                onClick={() => setIsNeighborhoodOpen(!isNeighborhoodOpen)}
              >
                <div className="flex items-center gap-2">
                  <MdLocationPin size={20} />
                  <span className="font-bold">Neighborhood & schools</span>
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    Hot market
                  </span>
                </div>
                {isNeighborhoodOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </div>
              {/* {isNeighborhoodOpen && (
                <div className="py-4">
                  <Neighborhood
                    address={data?.address}
                    city={data?.city}
                    country={data?.country}
                  />
                </div>
              )} */}
            </div>
          </div>

          {/* Map Section */}
          <div className="col-span-8 w-full lg:-mt-10  md:mt-14 min-[768px]">
            <GoogleMapSection
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>

        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 ml-4 sm:ml-8 md:ml-16 lg:ml-36 p-4">Related Properties</h2>
      <div className="flex mt-8 justify-center">
        <Related currentProperty={currentProperty} allProperties={allProperties} />
      </div>
    </div>
  );
};

export default Property;