import React from "react";
import useFavourites from "../../hooks/useProperties";
import PuffLoader from "react-spinners/PuffLoader";
import UserFavCard from "../../components/UserFavCard/UserFavCard";

const UserFav = () => {
  const { data, isError, isLoading } = useFavourites();
  console.log(data, "Fetched favourite data");

  if (isError) {
    return (
      <div className="wrapper">
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

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <div className="paddings flexCenter properties mt-11">
          <h1>USER FAVOURITES</h1>
          {data && data.length > 0 ? (
            data.map((card, i) => (
              <UserFavCard card={card} key={i} />  
            ))
          ) : (
            <span>No favourites found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFav;
