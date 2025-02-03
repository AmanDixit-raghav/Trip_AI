import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState('/Gemini.jpg'); 

  useEffect(() => {
    const fetchImage = async () => {
      if (!trip?.userSelection?.location) return;

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${trip.userSelection.location}&client_id=${import.meta.env.VITE_UNSPLASH_API}`
        );

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.regular); // Use the first image result
        }
      } catch (error) {
        console.error('Error fetching location image:', error);
      }
    };

    fetchImage();
  }, [trip?.userSelection?.location]); 

  return (
    <>
      <Link to={'https://www.google.com/maps/search/?api=1&query=' + trip?.userSelection?.location} target='_blank'>
   <div className="w-[90%] md:w-[80%] lg:w-[75%] max-w-5xl h-[450px] lg:h-[500px] md:h-[400px] sm:h-[350px] bg-gray-200 rounded-3xl border-[4px] border-red-300  relative overflow-hidden  hover:scale-105 transition-all cursor-pointer mt-6 m-auto">
        <img 
          src={imageUrl} 
          alt={trip?.userSelection?.location} 
          className="w-[1040px] h-[1000px] rounded-xl "
        />
      </div>
      </Link>
      
      <div className='my-5 flex flex-col gap-2 px-40'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
        <div className='flex gap-5 '>
          <h2 className='p-1 px-3 bg-gray-200 rounded-md w-fit'>📆 {trip?.userSelection?.NoOfDays} Day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-md w-fit'>🤑 {trip?.userSelection?.budget} Budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-md w-fit'>Traveler: {trip?.userSelection?.traveller} 🚶‍♂️</h2>
        </div>
      </div>
    
    </>
  );
}

export default InfoSection;
