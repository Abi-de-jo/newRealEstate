export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    }, 
  },
};

// common.js
export const updateFavourites = (id, favourites = []) => {
  // Ensure favourites is an array by default
  const favList = favourites || [];
  
  if (favList.includes(id)) {
    return favList.filter((resId) => resId !== id);
  } else {
    return [...favList, id];
  }
};
 

export const checkFavourites = (id, favourites = []) => {
  return favourites?.includes(id);
};



export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleast 3 characters"
    : null;
};
