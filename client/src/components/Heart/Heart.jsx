import React, { useContext, useEffect, useState } from "react";
import Heart from "react-animated-heart";
import { useMutation } from "react-query";
import { toFav } from "../../utils/api";
import UserDetailContext from "../../context/UserDetailsContext";
import { checkFavourites, updateFavourites } from "../../utils/common";

function Like({ id }) {
  const email = localStorage.getItem("email");
  const [isClick, setClick] = useState(false);
  const [heartColor, setHeartColor] = useState("white");

  const {
    userDetails: { favourites = [], token }, // Ensure favourites has a default empty array
    setUserDetails,
  } = useContext(UserDetailContext);

  // Set initial favorite state
  useEffect(() => {  
    const isFavorite = checkFavourites(id, favourites);
    setClick(isFavorite);
    setHeartColor(isFavorite ? "red" : "white");
  }, [favourites, id]);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));
    },
  });

  const handleLike = () => {
    if (email && token) { // Ensure both email and token are available
      mutate();
      setClick((prevClick) => !prevClick);
      setHeartColor((prevColor) => (prevColor === "white" ? "red" : "white"));
    } else {
      console.error("User email or token is not found");
    }
  };

  return (
    <div>
      <Heart
        isClick={isClick}
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}
        style={{ color: heartColor }} // Apply heart color style
      />
    </div>
  );
}

export default Like;
