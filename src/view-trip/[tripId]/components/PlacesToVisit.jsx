import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
<div>
<h2 className='font-medium text-lg mb-6 text-emerald-500 ml-6'><i>Places to Visit </i></h2>

  <div className='grid md:grid-cols-2 gap-5 '>

{Object.entries(trip.tripdata?.itinerary || {}).sort(([dayA], [dayB]) => {
      
        const numA = parseInt(dayA.replace(/\D/g, ""), 10);
        const numB = parseInt(dayB.replace(/\D/g, ""), 10);
        return numA - numB; 
    }).map(([day,details],dayindex)=>(
    <div key={dayindex} >
     <h2 className='font-bold text-lg text-purple-700 ml-6 '>{day.toUpperCase()}</h2>
     <h2 className='font-medium text-xl text-red-800'><span className='text-sky-800 ml-6'><i>Best Time to Visit:</i></span>{details?. best_time_to_visit}</h2>
     {details?.activities?.map((place, placeIndex) => (
      <PlaceCardItem key={placeIndex} item={place} />
    ))}
     </div>
    ))}
</div>
    </div>
  )
}

export default PlacesToVisit