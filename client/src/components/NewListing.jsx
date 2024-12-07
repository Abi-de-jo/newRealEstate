import React from 'react';
import useProperties from '../hooks/useProperties'; // Import the custom hook for fetching data
import NewCard from './NewCard';

const NewListing = () => {
  const { data, isLoading, isError } = useProperties();

  // Filter for new listings (within the last 24 hours)
  const newListings = data?.filter((property) => {
    const updatedTime = new Date(property.updatedAt);
    const now = new Date();
    const diffInHours = (now - updatedTime) / (1000 * 60 * 60);
    return diffInHours <= 24; // Only properties updated within the last 24 hours
  });

  if (isLoading) {
    return <div>Loading new listings...</div>;
  }

  if (isError) {
    return <div>Error fetching new listings.</div>;
  }

  if (!newListings || newListings.length === 0) {
    return <div>No new listings available.</div>;
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold mb-6">New Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newListings.map((listing) => (
          <NewCard key={listing.id} card={listing} />
        ))}
      </div>
    </div>
  );
};

export default NewListing;
