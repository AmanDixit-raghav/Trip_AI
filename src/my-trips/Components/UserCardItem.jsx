import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const accessKey = import.meta.env.VITE_UNSPLASH_API
function UserCardItem({trip}) {
  
      const [unsplashImageUrl, setUnsplashImageUrl] = useState("");
    
        useEffect(() => {
            if (trip?.userSelection?.location) {
                // Fetching images from Unsplash API
                fetch(`https://api.unsplash.com/search/photos?query=${trip?.userSelection?.location}&client_id=${accessKey}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.results && data.results.length > 0) {
                            setUnsplashImageUrl(data.results[0].urls.small); 
                        } else {
                            console.log("No image found for", trip?.userSelection?.location);
                        }
                    })
                    .catch((error) => console.error("Error fetching images from Unsplash:", error));
            }
        }, [trip?.userSelection?.location]); 
    return (
        <Link to={'/view-trip/'+trip?.id}>
     <div className='hover:scale-110 transition-all'>
        <img   src={unsplashImageUrl || "/Gemini.jpg"} className='rounded-xl h-[180px] w-full object-cover'/>
        <div>
        <h2>{trip?.userSelection?.location}</h2>
        
        <h2 className='font-semibold text-purple-600 text-pretty'>
  <i>{trip?.userSelection?.NoOfDays} {trip?.userSelection?.NoOfDays > 1 ? "Days"+" " : "Day"+" "} 
    Trip with {trip?.userSelection?.budget} Budget</i>
</h2>
        </div>
     </div>
     </Link>
  )
}

export default UserCardItem