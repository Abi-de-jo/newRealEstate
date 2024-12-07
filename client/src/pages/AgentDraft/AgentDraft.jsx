import React from "react";
import useAgentDraft from "../../hooks/useAgentDraft";
import PuffLoader from "react-spinners/PuffLoader";
 import AgentDraftCard from "../../AgentDraftCard/AgentDraftCard";
import '../Properties/properties.css'
const AgentDraft = () => {
  const { data, isError, isLoading } = useAgentDraft();
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
        <div className="paddings flexCenter properties mt-11">
           {data.map((card, i) => (
            <AgentDraftCard card={card} key={i} />  
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentDraft;
