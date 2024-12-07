import React from 'react';
import useProperties from '../hooks/useProperties'; // Import the custom hook for fetching data
 import RentCard from './RentCard';

const RentListing = () => {
  const { data, isLoading, isError } = useProperties();

  // Filter for properties with type "Rent"
  const rentalListings = data?.filter((property) => property.type === "Rent");

  if (isLoading) {
    return <div>Loading rental listings...</div>;
  }

  if (isError) {
    return <div>Error fetching rental listings.</div>;
  }

  if (!rentalListings || rentalListings.length === 0) {
    return <div>No rental listings available.</div>;
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold mb-6">Rental Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentalListings.map((listing) => (
          <RentCard key={listing.id} card={listing} />
        ))}
      </div>
    </div>
  );
};

export default RentListing;
