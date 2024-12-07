import React from 'react';
import useProperties from "../hooks/useProperties"; // Import the custom hook for fetching data
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RealBrowse = () => {
  const { t } = useTranslation("video");
  const { data, isLoading, isError } = useProperties();
  const navigate = useNavigate();

  const categories = [
    {
      title: t("newListings.title"),
      count:
        data?.filter((property) => {
          const updatedTime = new Date(property.updatedAt);
          const now = new Date();
          const diffInHours = (now - updatedTime) / (1000 * 60 * 60);
          return diffInHours <= 24; // New listings published within the last 24 hours
        }).length || 0,
      image: '/geo1.jpg',
      description: t("newListings.description"),
      onClick: () => navigate('/new-listings'),
    },
    {
      title: t("discountedApartments.title"),
      count: data?.filter((property) => property.discount).length || 0,
      image: '/geo3.jpg',
      description: t("discountedApartments.description"),
      onClick: () => navigate('/discount-listings'),
    },
    {
      title: t("updatedApartments.title"),
      count:
        data?.filter((property) => {
          const {
            originalTitle,
            originalPrice,
            originalDiscount,
            originalUpdatedAt,
          } = property; // Assuming these original fields exist
          return (
            property.title !== originalTitle ||
            property.price !== originalPrice ||
            property.discount !== originalDiscount ||
            new Date(property.updatedAt).getTime() !==
              new Date(originalUpdatedAt).getTime()
          );
        }).length || 0,
      image: '/geo4.jpg',
      description: t("updatedApartments.description"),
      onClick: () => navigate('/update-listings'),
    },
    {
      title: t("forRent.title"),
      count: data?.filter((property) => property.type === "Rent").length || 0,
      image: '/geo2.jpg',
      description: t("forRent.description"),
      onClick: () => navigate('/rent-listings'),
    },
    {
      title: t("forSale.title"),
      count: data?.filter((property) => property.type === 'Sale').length || 0,
      image: '/geo5.jpg',
      description: t("forSale.description"),
      onClick: () => navigate('/sale-listings'),
    },
    {
      title: t("land.title"),
      count: data?.filter((property) => property.propertyType === 'Land').length || 0,
      image: '/geo6.jpg',
      description: t("land.description"),
      onClick: () => navigate('/land-listings'),
    },
    {
      title: t("commercial.title"),
      count: data?.filter((property) => property.propertyType === 'Commercial').length || 0,
      image: '/geo3.jpg',
      description: t("commercial.description"),
      onClick: () => navigate('/commercial-listings'),
    },
    {
      title: t("recentlyRented.title"),
      count: data?.filter((property) => property.isRecentlyRented).length || 0,
      image: '/geo1.jpg',
      description: t("recentlyRented.description"),
      onClick: () => navigate('/recent-listings'),
    },
  ];

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  if (isError) {
    return <div>{t("error")}</div>;
  }

  return (
    <div className="container mx-auto mt-9 px-4">
      <h2 className="text-2xl font-bold mb-6">{t("header")}</h2>

      <div className="flex gap-4 overflow-x-auto lg:grid lg:grid-cols-4 lg:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative min-w-[300px] sm:min-w-[350px] lg:min-w-full h-[250px] rounded-xl shadow-lg cursor-pointer group flex-shrink-0"
            style={{
              backgroundImage: `url(${category.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={category.onClick}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl transition-opacity duration-300 group-hover:bg-opacity-60"></div>

            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg text-white font-semibold">{category.title}</h3>
              <p className="text-sm text-white">{category.description}</p>
            </div>

            <div className="absolute top-4 right-4">
              <span className="text-white bg-black bg-opacity-75 rounded-full px-3 py-1 text-sm font-semibold">
                {category.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealBrowse;
