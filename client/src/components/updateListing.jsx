import React from "react";
import useProperties from "../hooks/useProperties"; // Import the custom hook for fetching data
import UpdateCard from "./updateCard";

const UpdateListing = () => {
  const { data, isLoading, isError } = useProperties();

  // Pass all properties to UpdateCard for filtering updated properties
  if (isLoading) {
    return <div>Loading updated listings...</div>;
  }

  if (isError) {
    return <div>Error fetching updated listings.</div>;
  }

  if (!data || data.length === 0) {
    return <div>No listings available.</div>;
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold mb-6">Updated Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((listing) => (
          <UpdateCard key={listing.id} card={listing} originalData={data} />
        ))}
      </div>
    </div>
  );
};

export default UpdateListing;
