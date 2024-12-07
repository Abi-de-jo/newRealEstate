import React from 'react';
import useProperties from '../hooks/useProperties'; // Import the custom hook for fetching data
 import CommercialCard from './CommercialCard';

const CommercialListing = () => {
  const { data, isLoading, isError } = useProperties();

  // Filter for properties with type "Sale"
  const CommercialListing = data?.filter((property) => property.propertyType === "Commercial");

  if (isLoading) {
    return <div>Loading Saleal listings...</div>;
  }

  if (isError) {
    return <div>Error fetching Saleal listings.</div>;
  }

  if (!CommercialListing || CommercialListing.length === 0) {
    return <div>No Saleal listings available.</div>;
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold mb-6">Saleal Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CommercialListing.map((listing) => (
          <CommercialCard key={listing.id} card={listing} />
        ))}
      </div>
    </div>
  );
};

export default CommercialListing;
