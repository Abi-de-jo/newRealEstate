import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import useLikes from "../../hooks/useLikes";
import useProperties from "../../hooks/useProperties";
import LikeCard from "../LikeCard/LikeCard";

const Likes = () => {
  const {
    data: LikesData,
    isError: likesError,
    isLoading: likesLoading,
  } = useLikes();
  const {
    data: propertiesData,
    isError: propertiesError,
    isLoading: propertiesLoading,
  } = useProperties();
  const [filteredLikes, setFilteredLikes] = useState([]);

  useEffect(() => {
    if (LikesData && propertiesData) {
      const likeIds = LikesData.map((like) => like); 
      const filtered = propertiesData.filter((property) =>
        likeIds.includes(property.id)
      ); // Filter properties based on like IDs
      setFilteredLikes(filtered); // Set filtered properties
    }
  }, [LikesData, propertiesData]);

  if (likesError || propertiesError) {
    return (
      <div className="wrapper">
        <span className="text-red-500 font-semibold">
          Error while fetching data. Please try again later..
        </span>
      </div>
    );
  }

  if (likesLoading || propertiesLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader size={80} color="#4066ff" aria-label="Loading spinner" />
      </div>
    );
  }

  if (!filteredLikes.length) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <span className="text-gray-500 text-lg">
          No Likes found. Book your favorite properties now!
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 mt-24">
      {/* Left Side - Likes */}
      <div className="col-span-1 lg:col-span-12 bg-gray-100 p-4 overflow-y-auto ">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Your Likes</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLikes.map((property) => (
            <LikeCard card={property} key={property.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Likes;
