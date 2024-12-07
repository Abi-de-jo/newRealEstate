import React, { useState, useEffect } from 'react';
import { Heart, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define a helper function for conditional classes
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MapCard({ 
  card = {
    id: 1,
    images: ["/placeholder.svg?height=400&width=600", "/placeholder2.svg?height=400&width=600"],
    price: "1,03,147",
    title: "Luxury Apartment",
    location: "Indore, India",
    rating: 4.67,
    dates: "10-15 Nov",
    bathrooms: 2,
    parking: 1,
    rooms: 3,
    area: "1200 sqft"
  }
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  // Check if the card is liked on component mount
  useEffect(() => {
    const likedProperties = JSON.parse(localStorage.getItem('likedProperties')) || [];
    setIsLiked(likedProperties.includes(card.id));
  }, [card.id]);

  // Auto slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === card.images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, [card.images.length]);

  // Handle like click
  const handleLikeClick = (e) => {
    e.stopPropagation();
    const likedProperties = JSON.parse(localStorage.getItem('likedProperties')) || [];

    if (isLiked) {
      // Remove the property from the liked list
      const updatedLikes = likedProperties.filter((id) => id !== card.id);
      localStorage.setItem('likedProperties', JSON.stringify(updatedLikes));
    } else {
      // Add the property to the liked list
      likedProperties.push(card.id);
      localStorage.setItem('likedProperties', JSON.stringify(likedProperties));
    }

    setIsLiked(!isLiked); // Toggle like state
  };

  if (!isVisible) return null;

  return (
    <div
      className="w-[230px] h-[300px] overflow-hidden rounded-xl bg-white shadow-lg"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      <div className="relative aspect-[3/3]">
        {/* Image */}
        <img
          src={card.images[currentImage]}
          alt={card.title}
          className="h-full w-full object-cover transition-transform duration-500"
        />

        {/* Navigation Arrows */}
        {card.images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev === 0 ? card.images.length - 1 : prev - 1));
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev === card.images.length - 1 ? 0 : prev + 1));
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Top Actions */}
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            className="rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
            onClick={handleLikeClick}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current text-red-500")} />
          </button>
          <button
            className="rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Image Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {card.images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-white/80",
                currentImage === index && "bg-white"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <span className="font-semibold">${card.price}/Mon..</span>

          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{card.rating}</span>
          </div>
        </div>
        <p className="-mt-2 text-sm text-gray-600">{card.location}</p>
        <div className="flex gap-2 mt-3 text-xs text-gray-600">
          <div className="flex items-center ">
            🛏️ <span>{card.rooms}Room</span>
          </div>
          <div className="flex items-center ">
            🛁 <span>{card.bathrooms}Bath</span>
          </div>
          <div className="flex items-center  ">
            📐 <span>{card.area}Sq.mt</span>
          </div>
        </div>
      </div>
    </div>
  );
}
