import React from 'react';
import useProperties from '../hooks/useProperties'; // Import the custom hook for fetching data
 import SaleCard from './SaleCard';

const SaleListing = () => {
  const { data, isLoading, isError } = useProperties();

  // Filter for properties with type "Sale"
  const SalealListings = data?.filter((property) => property.type === "Sale");

  if (isLoading) {
    return <div>Loading Saleal listings...</div>;
  }

  if (isError) {
    return <div>Error fetching Saleal listings.</div>;
  }

  if (!SalealListings || SalealListings.length === 0) {
    return <div>No Saleal listings available.</div>;
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold mb-6">Saleal Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SalealListings.map((listing) => (
          <SaleCard key={listing.id} card={listing} />
        ))}
      </div>
    </div>
  );
};

export default SaleListing;
