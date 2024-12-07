import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import PuffLoader from "react-spinners/PuffLoader";
import { getAllOwners } from "../../utils/api";
import AdminOwnerTrackDraft from '../../pages/adminOwnerTrackDraft/adminOwnerTrackDraft';
 
export const OwnerProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Created');

  const { data, isLoading, isError } = useQuery(['owner', id], () => getAllOwners(id), {
    select: (response) => response.find(owner => owner.id === id)
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#2563eb" size={100} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-600 text-xl font-semibold text-center px-4">
          Error fetching owner details. Please try again.
        </span>
      </div>
    );
  }

  const renderTabContent = () => {
    if (activeTab === 'Created') {
      return <AdminOwnerTrackDraft />;
    }
    return null;
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative bg-blue-500 h-32 sm:h-40">
          <img
            src={data.profilePicture || '/placeholder.svg'}
            alt={data.username || 'Owner'}
            className="absolute -bottom-10 left-4 sm:left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 pt-12 sm:pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">{data.name}</h1>
              <p className="text-sm sm:text-base text-gray-600">{data.designation || 'No designation available'}</p>
              <p className="flex items-center text-sm sm:text-base text-gray-600">
                <span>{data.location || 'Location not available'}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 my-6">
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <span className="text-blue-600 text-lg sm:text-xl">📧</span>
              <span className="text-sm sm:text-base">{data.email || 'Email not available'}</span>
            </div>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <span className="text-blue-600 text-lg sm:text-xl">📱</span>
              <span className="text-sm sm:text-base">{data.teleNumber || 'Phone not available'}</span>
            </div>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <span className="text-blue-600 text-lg sm:text-xl">🏢</span>
              <span className="text-sm sm:text-base">{data.username || 'Agency not available'}</span>
            </div>
          </div>

          <div className="flex justify-center my-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('Created')}
              className="py-2 px-4 text-sm sm:text-base font-semibold text-blue-500 border-b-2 border-blue-500"
            >
              Created
            </button>
          </div>

          <div className="mt-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

