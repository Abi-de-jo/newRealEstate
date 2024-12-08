import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import PuffLoader from "react-spinners/PuffLoader";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import GoogleMapSection from "../../components/Map/GoogleMapSection";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
 import { Modal } from "@mantine/core";
import axios from "axios";

export const OwnerTrackDraftId = () => {
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(false);
  const [agentTeleNumber, setAgentTeleNumber] = useState(""); // Updated state name
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["residency", id], () =>
    getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchAgentTeleNumber = async () => {
      if (data?.agentEmail) {
        try {
          console.log(data.agentEmail);
          const email = data.agentEmail;
          const response = await axios.post("http://localhost:3000/api/agent/get", { email });
          setAgentTeleNumber(response.data?.teleNumber || "No Update"); // Set teleNumber here
        } catch (error) {
          console.error("Error:", error);
          setAgentTeleNumber("No Update");
        }
      }
    };

    fetchAgentTeleNumber();
  }, [data?.agentEmail]);

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* LIKE */}
        <div className="relative w-full h-[500px] mt-6">
          
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full ">
            <img
              src={data?.images[0]}
              alt="main home"
              className="row-span-2 col-span-1 object-cover w-full h-full rounded-lg shadow-md"
            />
            <img
              src={data?.images[1]}
              alt="home 1"
              className="object-cover w-full h-full rounded-lg shadow-md"
            />
            <img
              src={data?.images[2]}
              alt="home 2"
              className="object-cover w-full h-full rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>
            <div className="flex flex-col font-bold">({data?.type})</div>

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
                <FaShower size={24} className="text-blue-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {data?.bathroom} Bathroom
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

            <button
              onClick={() => setOpened(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
            >
              View Amenities
            </button>

            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Amenities"
              centered
            >
              <div className="flex flex-col">
                {data?.amenities && data.amenities.length > 0 ? (
                  data.amenities.map((amenity, index) => (
                    <button
                      key={index}
                      className="mt-2 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-gray-700 transition-all duration-300"
                    >
                      {amenity}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">No amenities available.</p>
                )}
              </div>
            </Modal>

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            <div className="flex items-center gap-2 mt-4">
  <span className="font-semibold text-gray-700">Status:</span>
  <span
    className={`px-3 py-1 rounded-full text-white font-medium ${
      data?.status === "agentDraft"
        ? "bg-yellow-500 animate-pulse"
        : data?.status === "agentsAchieve"
        ? "bg-green-500 animate-pulse"
        : data?.status === "draft"
        ? "bg-blue-500 animate-pulse"
        : "bg-red-500"
    }`}
  >
    {data?.status === "agentDraft"
      ? "On Progress"
      : data?.status === "agentsAchieve"
      ? "Done"
      : data?.status === "draft"
      ? "Waiting for Agents..."
      : "NO UPDATE"}
  </span>
</div>



            <div className="flex items-center gap-2 mt-4">
              <span className="font-semibold text-gray-700">Agent Contact:</span>
              <div className="flex items-center gap-2 text-blue-500">
                <MdLocationPin size={20} />
                <span className="underline">{agentTeleNumber}</span>
              </div>
            </div>

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>

            <BookingModal
              opened={modalOpened}
              propertyId={id}
              email={user?.email}
              status={data?.status}
              agentEmail={data?.agentEmail}
              setOpened={setModalOpened}
            />
          </div>

          <div className="map">
            <GoogleMapSection
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
