import React from 'react';
import useProperties from '../hooks/useProperties'; // Import the custom hook for fetching data
import NewCard from './NewCard';

const DiscountListing = () => {
  const { data, isLoading, isError } = useProperties();

  // Filter for discounted properties
  const discountedProperties = data?.filter((property) => property.discount);

  if (isLoading) {
    return <div>Loading discounted properties...</div>;
  }

  if (isError) {
    return <div>Error fetching discounted properties.</div>;
  }

  if (!discountedProperties || discountedProperties.length === 0) {
    return <div>No discounted properties available.</div>;
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold mb-6">Discounted Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discountedProperties.map((property) => (
          <NewCard key={property.id} card={property} />
        ))}
      </div>
    </div>
  );
};

export default DiscountListing;
