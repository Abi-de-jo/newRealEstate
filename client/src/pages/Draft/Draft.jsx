import React from "react";
import useDraft from "../../hooks/useDraft";
import PuffLoader from "react-spinners/PuffLoader";
// import PropertyCard from '../../components/PropertyCard/PropertyCard';
import DraftCard from "../../DraftCard/DraftCard";

const Draft = () => {
  const { data, isError, isLoading } = useDraft();

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
        <div className="paddings flexCenter properties mt-11 gap-9">
           {data.map((card, i) => (
            <DraftCard card={card} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Draft;
