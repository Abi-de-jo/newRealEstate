import React from 'react';
import { useTranslation } from 'react-i18next';

const RealRecom = () => {
  const { t } = useTranslation('recommendations');

  const neighborhoods = [
    {
      name: 'City Side',
      listings: 54,
      price: '$496,000',
      image: 'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: 'Peaceful Areas',
      listings: 53,
      price: '$1,249,000',
      image: 'https://images.pexels.com/photos/16446849/pexels-photo-16446849/free-photo-of-aerial-view-of-a-house-in-the-countryside.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      name: 'Lakes Nearby',
      listings: 37,
      price: '$779,500',
      image: 'https://images.pexels.com/photos/262405/pexels-photo-262405.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Sunset',
      listings: 33,
      price: '$514,999',
      image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-16">
      <h2 className="text-2xl font-bold mb-2">{t('header')}</h2>
      <p className="text-gray-600 mb-6">{t('subheader')}</p>

      {/* Flex container for horizontal scroll below 1280px, grid layout for screens 1280px and above */}
      <div className="flex gap-6 overflow-x-auto lg:grid lg:grid-cols-4 scrollbar-hide">
        {neighborhoods.map((neighborhood, index) => (
          <div
            key={index}
            className="min-w-[250px] sm:min-w-[300px] rounded-lg overflow-hidden shadow-lg bg-white flex-shrink-0 lg:flex-shrink lg:w-auto group"
          >
            <div className="overflow-hidden">
              <img
                src={neighborhood.image}
                alt={`${neighborhood.name} Map`}
                className="w-full h-40 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{neighborhood.name}</h3>
              <p className="text-gray-700">
                {t('listings', { count: neighborhood.listings })}
              </p>
              <p className="text-gray-700 font-semibold">
                {t('medianPrice', { price: neighborhood.price })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealRecom;
