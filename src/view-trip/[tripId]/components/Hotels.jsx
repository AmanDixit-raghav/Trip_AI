import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState([]); 

  useEffect(() => {
    if (trip?.tripdata?.hotel_options) {
      const fetchImages = async () => {
        const updatedImages = await Promise.all(
          trip.tripdata.hotel_options.map(async (item) => {
            try {
           
              const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${item.hotelName}&client_id=${import.meta.env.VITE_UNSPLASH_API}`
              );
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                return {
                  hotelName: item.hotelName,
                  imageUrl: data.results[0].urls.small, // Save first image
                };
              } else {
                return {
                  hotelName: item.hotelName,
                  imageUrl: '/Gemini.jpg', 
                };
              }
            } catch (error) {
              console.error('Error fetching images from Unsplash:', error);
              return {
                hotelName: item.hotelName,
                imageUrl: '/Gemini.jpg', 
              };
            }
          })
        );
        setHotelImages(updatedImages); 
      };

      fetchImages(); 
    }
  }, [trip?.tripdata?.hotel_options]);

  return (
    <div>
      <h2 className='font-md text-xl mt-5  text-emerald-400 ml-7'><i>Hotel Recommendation</i></h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 mt-6 mb-6 ml-10'>
        {trip?.tripdata?.hotel_options?.map((item, index) => {
          const hotelImage = hotelImages.find(
            (image) => image.hotelName === item.hotelName
          )?.imageUrl; 
          return (
            <Link
              to={'https://www.google.com/maps/search/?api=1&query=' + item.hotelName + ',' + item.hotelAddress}
              target='_blank'
              key={index}
            >
              <div className=' hover:scale-105 transition-all cursor-pointer'>
                <img
                  src={hotelImage || "/Gemini.jpg"} 
                  className='rounded-xl h-[180px] w-full object-cover'
                  alt={item.hotelName}
                />
                <div className='my-2 flex flex-col gap-2'>
                  <h2 className='font-semibold'>{item.hotelName}</h2>
                  <h2 className='text-xs text-gray-500 font-semibold'>📍{item.hotelAddress}</h2>
                  <h2 className='text-sm font-semibold text-gray-500'>🤑{item.price}</h2>
                  <h2 className='text-sm font-semibold text-gray-500'>{item.rating}⭐</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
