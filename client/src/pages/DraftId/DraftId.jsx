import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import PuffLoader from "react-spinners/PuffLoader";
import { AiOutlineLeft, AiOutlineRight, AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GoogleMapSection from "../../components/Map/GoogleMapSection";
import BookingModal from "../../components/BookingModal/BookingModal";
import { useAuth0 } from "@auth0/auth0-react";
import useAgents from "../../hooks/useGetAllAgents";
import axios from "axios";

export const DraftId = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const id = pathname.split("/").slice(-1)[0];
  const { user } = useAuth0();

  const { data, isLoading, isError } = useQuery(["residency", id], () => getProperty(id));
  const { data: agents, isLoading: agentsLoading } = useAgents();

  const [acceptCount, setAcceptCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [agentModalOpened, setAgentModalOpened] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const email = localStorage.getItem("email");
  const adminEmail = localStorage.getItem("adminEmail");

  useEffect(() => {
    if (!email) return;

    const storedCount = parseInt(localStorage.getItem(`acceptCount_${email}`) || "0", 10);
    const storedTimestamp = parseInt(localStorage.getItem(`acceptTimestamp_${email}`) || "0", 10);

    const elapsedTime = Date.now() - storedTimestamp;
    const timeLimit = 24 * 60 * 60 * 1000;
    const remaining = timeLimit - elapsedTime;

    if (elapsedTime < timeLimit) {
      setAcceptCount(storedCount);
      setIsButtonDisabled(storedCount >= 2);
      if (storedCount >= 2) setRemainingTime(remaining);
    } else {
      resetAcceptState();
    }
  }, [email]);

  useEffect(() => {
    if (isButtonDisabled && remainingTime !== null) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === null || prev <= 0) {
            clearInterval(interval);
            resetAcceptState();
            return null;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isButtonDisabled, remainingTime]);

  const resetAcceptState = useCallback(() => {
    if (!email) return;
    localStorage.removeItem(`acceptCount_${email}`);
    localStorage.removeItem(`acceptTimestamp_${email}`);
    setAcceptCount(0);
    setIsButtonDisabled(false);
    setRemainingTime(null);
  }, [email]);

  const formatTime = (ms)=>  {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

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

  const handleAccept = async () => {
    if (!email) {
      alert("You must be signed in to contact on Telegram.");
      return;
    }

    if (acceptCount >= 2) {
      alert("You have reached the limit of 2 accepts. Try again after 24 hours.");
      return;
    }

    try {
      await axios.put(`https://new-real-estate-server.vercel.app/api/residency/accept/${data?.id}`, { email });

      const newCount = acceptCount + 1;
      setAcceptCount(newCount);
      localStorage.setItem(`acceptCount_${email}`, newCount.toString());
      localStorage.setItem(`acceptTimestamp_${email}`, Date.now().toString());

      if (newCount >= 2) {
        setIsButtonDisabled(true);
        setRemainingTime(24 * 60 * 60 * 1000);
      }

      navigate("/draft");
    } catch (error) {
      console.error("Error accepting post:", error);
    }
  };

  const handleAcceptbyAdmin = async () => {
    if (!email) {
      alert("You must be signed in to contact on Telegram.");
      return;
    }

    try {
      await axios.put(`https://new-real-estate-server.vercel.app/api/admin/acceptByAdmin/${data?.id}`, { email });
      navigate("/draft");
    } catch (error) {
      console.error("Error accepting post:", error);
    }
  };

  const handleForwardToAgent = async () => {
    if (!selectedAgent) {
      alert("Please select an agent to forward.");
      return;
    }

    try {
      await axios.post(`https://new-real-estate-server.vercel.app/api/admin/forwardAgent/${data?.id}`, { email: selectedAgent });
      alert("Successfully forwarded to agent.");
      setAgentModalOpened(false);
    } catch (error) {
      console.error("Error forwarding to agent:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Error while fetching data</span>
      </div>
    );
  }

  const images = data?.images || [];
  const roomImages = images.slice(1, 4).map((src) => ({ src, label: "" }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative md:mt-9 sm:mt-9 mt-5">
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
                    className="absolute left-4 top-1/2 z-10 bg-white/80 rounded-full p-2 transform -translate-y-1/2"
                  >
                    <AiOutlineLeft size={24} />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                  <button
                    onClick={onClickHandler}
                    className="absolute right-4 top-1/2 z-10 bg-white/80 rounded-full p-2 transform -translate-y-1/2"
                  >
                    <AiOutlineRight size={24} />
                  </button>
                )
              }
            >
              {images.map((src, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9">
                  <img src={src} alt={`Property Image ${index + 1}`} className="object-cover rounded-lg" />
                </div>
              ))}
            </Carousel>
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm"
                onClick={handleShare}
              >
                <FiShare className="w-4 h-4" />
                <span>Share</span>
              </button>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm">
                {currentSlide + 1}/{images.length}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {roomImages.map((image, index) => (
              <div key={index} className="aspect-w-4 aspect-h-3">
                <img src={image.src} alt={image.label} className="object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </div>

      <div className="space-y-6 md:mt-10">
  <div>
    <h1 className="text-3xl font-bold">{data?.title}</h1>

    <h1 className="text-xs text-green-500 font-bold">{data?.propertyType}</h1>  

    <div className="flex items-center space-x-2 mt-3">
      {data?.discount ? (
        <>
          <span className="text-gray-500 line-through text-lg">${data?.price}</span>
          <span className="orangeText text-xl font-bold">${data?.discount}</span>
        </>
      ) : (
        <span className="orangeText text-xl">${data?.price}</span>
      )}
    </div>
    <p className="text-lg mt-2 font-medium">🟢Property for ({data?.type})</p>
  </div>
  <div className="grid grid-cols-3 gap-4">
    {[
      { icon: FaShower, label: `${data?.bathrooms} Bath` },
      { icon: AiTwotoneCar, label: `${data?.parking} Park` },
      { icon: MdMeetingRoom, label: `${data?.rooms} Room` },
    ].map(({ icon: Icon, label }, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300"
      >
        <Icon size={24} className="text-blue-500 mb-2" />
        <span className="text-sm font-semibold text-gray-700 text-center">{label}</span>
      </div>
    ))}
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
  {!adminEmail ? (
    <button
      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      disabled={isButtonDisabled}
      onClick={handleAccept}
    >
      {isButtonDisabled
        ? `Accept Disabled (Try again in ${formatTime(remainingTime || 0)})`
        : "Accept"}
    </button>
  ) : (
    <div className="flex gap-4">
      <button
        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg"
        onClick={() => setAgentModalOpened(true)}
      >
        Forward to Agent
      </button>
      <button
        className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg"
        onClick={handleAcceptbyAdmin}
      >
        Accept by Admin
      </button>
    </div>
  )}
  <div className="aspect-w-16 aspect-h-9">
    <GoogleMapSection
      address={data?.address}
      city={data?.city}
      country={data?.country}
    />
  </div>
</div>



      </div>

      <BookingModal
        opened={modalOpened}
        propertyId={id}
        email={user?.email}
        setOpened={setModalOpened}
      />

      {agentModalOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Select an Agent</h3>
            {agentsLoading ? (
              <div>Loading agents...</div>
            ) : (
              <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                {agents?.map((agent) => (
                  <li
                    key={agent.id}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedAgent === agent.email ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedAgent(agent.email)}
                  >
                    {agent.name} ({agent.email})
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded-lg"
                onClick={() => setAgentModalOpened(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                onClick={handleForwardToAgent}
                disabled={!selectedAgent}
              >
                Forward
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

