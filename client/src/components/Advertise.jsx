import React from 'react';

function Advertise() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 py-16 px-6">
      {/* Left Section - Text */}
      <div className="flex flex-col items-start md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 leading-tight">
          Add up to 10 images with a clear view that captures all facilities
        </h1>
        <p className="text-lg text-gray-700">
          Showcase every aspect of your property, ensuring prospective clients can visualize each detail and amenity offered.
        </p>
        <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full text-lg font-medium hover:bg-red-700 transition">
          Request a demo
        </button>
      </div>

      {/* Right Section - Placeholder for Images */}
      <div className="mt-8 md:mt-0 md:ml-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:w-1/2">
        {/* Placeholder image boxes to indicate where images will go */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden shadow-lg bg-gray-200 h-48 flex items-center justify-center">
            <span className="text-gray-500">Image {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Advertise;
