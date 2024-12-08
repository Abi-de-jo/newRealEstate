import React, { useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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

export const GenArchieveId = () => {
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(false);

  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["residency", id], () =>
    getProperty(id)
  );
const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useAuth0();

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
        <div className="flexCwnter paddings">
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
          {/* Heart Icon */}
          <div className="absolute top-4 left-4 z-10">
            <Heart id={id} />
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
            {/* Main Image (spanning 2 rows and 1 col) */}
            <img
              src={data?.images[0]}
              alt="main home"
              className="row-span-2 col-span-1 object-cover w-full h-full rounded-lg shadow-md"
            />

            {/* Secondary Images */}
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

            <div className="flex flex-wrap gap-6 mt-4">
              {/* Facility - Bathroom */}
              <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
                <FaShower size={24} className="text-blue-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {data?.bathroom} Bathroom
                </span>
              </div>

              {/* Facility - Parking */}
              <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
                <AiTwotoneCar size={24} className="text-blue-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {data?.bathrooms} Parking
                </span>
              </div>

              {/* Facility - Room */}
              <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300">
                <MdMeetingRoom size={24} className="text-blue-500" />
                <span className="text-lg font-semibold text-gray-700">
                  {data?.rooms} Room
                </span>
              </div>
            </div>

            {/* Additional Facilities Row */}

            <button
              onClick={() => setOpened(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
            >
              View Amenities
            </button>

            {/* Modal for Amenities */}
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

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}
                {data?.city}
                {data?.country}
              </span>
            </div>

            {/* Booking */}

            <button
              className="button"
              onClick={async() =>  {
                const storedUser = localStorage.getItem("email");
                console.log(storedUser)
                // Check if user data exists in localStorage, indicating a logged-in state
                if (storedUser) {
                  setModalOpened(true);
                  console.log(data.id)
                  console.log(storedUser)
                } else {
                  alert("You must be signed in to contact on Telegram."); // Alert if not logged in
                }


               
                  try {
                    const response = await axios.put(`https://new-real-estate-server.vercel.app/api/residency/accept/${data.id}`,{email:storedUser});
                    console.log('Post accepted:', response.data);
                  } catch (error) {
                    console.error('Error accepting post:', error);
                  }

              navigate("/draft")
               }}

               
            >
              Accept
            </button>

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
    </div>
  );
};