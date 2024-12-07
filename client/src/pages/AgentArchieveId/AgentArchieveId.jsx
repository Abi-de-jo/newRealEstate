import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperty } from "../../utils/api";
import PuffLoader from "react-spinners/PuffLoader";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import GoogleMapSection from "../../components/Map/GoogleMapSection";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import Heart from "../../components/Heart/Heart";
import { Modal } from "@mantine/core";
import axios from "axios";

export const AgentArchieveId = () => {
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(false);
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["residency", id], () => getProperty(id));
  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useAuth0();

  const archieve = async () => {
    const storedUser = localStorage.getItem("email");
    if (storedUser) {
      setModalOpened(true);
      try {
        const response = await axios.put(`http://localhost:3000/api/residency/publish/${data.id}`, { email: storedUser });
        console.log('Post accepted:', response.data);
      } catch (error) {
        console.error('Error accepting post:', error);
      }
      navigate("/draft");
    } else {
      alert("You must be signed in to contact on Telegram.");
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
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mt-6">
          <div className="absolute top-4 left-4 z-10">
            <Heart id={id} />
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
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
          {/* LEFT */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.Title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>
            <div className="flex flex-col font-bold">({data?.type})</div>

            {/* FACILITIES */}
            <div className="flex flex-wrap gap-4 mt-4">
              <FacilityItem icon={FaShower} text={`${data?.bathroom} Bathroom`} />
              <FacilityItem icon={AiTwotoneCar} text={`${data?.bathrooms} Parking`} />
              <FacilityItem icon={MdMeetingRoom} text={`${data?.rooms} Room`} />
            </div>

            {/* Amenities Button */}
            <button
              onClick={() => setOpened(true)}
              className="mt-4 w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 text-lg font-semibold"
            >
              View Amenities
            </button>

            {/* Description and Address */}
            <span className="secondaryText mt-4" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            <div className="flexStart mt-4" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
              <button
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 text-lg font-semibold"
                onClick={async () => {
                  const storedUser = localStorage.getItem("email");
                  if (storedUser) {
                    setModalOpened(true);
                    try {
                      const response = await axios.put(`http://localhost:3000/api/residency/accept/${data.id}`, { email: storedUser });
                      console.log('Post accepted:', response.data);
                    } catch (error) {
                      console.error('Error accepting post:', error);
                    }
                    navigate("/draft");
                  } else {
                    alert("You must be signed in to contact on Telegram.");
                  }
                }}
              >
                Accept
              </button>
              <button
                onClick={archieve}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 text-lg font-semibold"
              >
                RE-Upload
              </button>
            </div>

            {/* Booking Modal */}
            <BookingModal
              opened={modalOpened}
              propertyId={id}
              email={user?.email}
              setOpened={setModalOpened}
            />
          </div>

          {/* RIGHT */}
          <div className="map">
            <GoogleMapSection
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>

      {/* Amenities Modal */}
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
    </div>
  );
};

const FacilityItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 p-3 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
    <Icon size={24} className="text-blue-500" />
    <span className="text-sm font-semibold text-gray-700">{text}</span>
  </div>
);

export default AgentArchieveId;