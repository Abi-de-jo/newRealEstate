import React, { useContext } from 'react';
import useProperties from '../../hooks/useProperties';
import PuffLoader from "react-spinners/PuffLoader";
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import UserDetailContext from '../../context/UserDetailsContext';
  
const Favorites = () => {
  const { data, isError, isLoading } = useProperties();
  const {userDetails :{favourites}} = useContext(UserDetailContext)
  if (isError) {
    return (
      <div className='wrapper'>
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader size={80} color="#4066ff" aria-label="puff-loading" />
      </div>
    );
  }

  // Filter properties based on selected address
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 mt-24">
      {/* Left Side - Properties */}
      <div className="col-span-1 lg:col-span-6 bg-gray-100 p-4 overflow-y-auto max-h-[80vh]">
        <div className='mb-4 flex flex-col '>
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data

          .filter((property)=> favourites.includes(property.id))
          
          
          
          
          
          
          
          .map((card, i) => (
            <PropertyCard card={card} key={i} />
          ))}
        </div>
      </div>

      {/* Right Side - Map */}
       
    </div>
  );
};

export default Favorites;
