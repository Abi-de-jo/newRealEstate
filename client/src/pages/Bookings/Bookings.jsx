import React, { useEffect, useState } from "react";
import useBookings from "../../hooks/useBookings";
 import PuffLoader from "react-spinners/PuffLoader";
import BookCard from "../../components/BookCard/BookCard";
import useAll from "../../hooks/useGetAll";

const Bookings = () => {
  const { data: bookingsData, isError: bookingsError, isLoading: bookingsLoading } = useBookings();
  const { data: propertiesData, isError: propertiesError, isLoading: propertiesLoading } = useAll();
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    if (bookingsData && propertiesData) {
       const bookingIds = bookingsData.map((booking) => booking.id);
      const filtered = propertiesData.filter((property) => bookingIds.includes(property.id));
      setFilteredBookings(filtered);
    }
  }, [bookingsData, propertiesData]);

  if (bookingsError || propertiesError) {
    return (
      <div className="wrapper">
        <span className="text-red-500 font-semibold">
          Error while fetching data. Please try again later.
        </span>
      </div>
    );
  }

  if (bookingsLoading || propertiesLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader size={80} color="#4066ff" aria-label="Loading spinner" />
      </div>
    );
  }

  if (!filteredBookings.length) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <span className="text-gray-500 text-lg">
          No bookings found. Book your favorite properties now!
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 mt-24">
      {/* Left Side - Bookings */}
      <div className="col-span-1 lg:col-span-12 bg-gray-100 p-4 overflow-y-auto ">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Your Bookings</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-col-2 gap-4">
          {filteredBookings.map((property) => (
            <BookCard card={property} key={property.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;