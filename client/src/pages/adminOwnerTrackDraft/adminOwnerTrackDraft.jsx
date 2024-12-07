import React from "react";
import useOwnerTrack from "../../hooks/useOwnerTrack";
import PuffLoader from "react-spinners/PuffLoader";
 import AdminOwnerTrackCard from "../../components/adminOwnerTrackCard/adminOwnerTrackCard";

const AdminOwnerTrackDraft = () => {
  const { data, isError, isLoading } = useOwnerTrack();
  console.log(data,"jjjjjjjjjjjjjjjjjjjjjjjj")

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    // Ensure you return the loading JSX here
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader size={80} color="#4066ff" aria-label="puff-loading" />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <div className="paddings flexCenter properties mt-11 gap-10">
           {data.map((card, i) => (
            <AdminOwnerTrackCard card={card} key={i} />  
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOwnerTrackDraft;


