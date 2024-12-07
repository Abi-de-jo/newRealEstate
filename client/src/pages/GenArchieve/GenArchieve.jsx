import React from "react";
import GenAchieve from "../../hooks/useGenAchieve";
import PuffLoader from "react-spinners/PuffLoader";
import GenArchieveCard from "../../components/GenArchieveCard/GenArchieveCard";

const GenArchieve = () => {
  const { data, isError, isLoading } = GenAchieve();

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
        <div className="paddings flexCenter properties mt-11">
            {data.map((card, i) => (
            <GenArchieveCard card={card} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenArchieve;
