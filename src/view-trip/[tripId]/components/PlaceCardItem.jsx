import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const accessKey = import.meta.env.VITE_UNSPLASH_API 

function PlaceCardItem({ item }) {
    console.log("Place data:", item); 
    const [unsplashImageUrl, setUnsplashImageUrl] = useState(""); 

    useEffect(() => {
        if (item?.placeName) {
         
            fetch(`https://api.unsplash.com/search/photos?query=${item.placeName}&client_id=${accessKey}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.results && data.results.length > 0) {
                        setUnsplashImageUrl(data.results[0].urls.small); 
                    } else {
                        console.log("No image found for", item.placeName);
                    }
                })
                .catch((error) => console.error("Error fetching images from Unsplash:", error));
        }
    }, [item?.placeName]); 

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + item?.placeName} target='_blank'>
            <div className='flex flex-row gap-4 border rounded-xl p-3 mt-5 mr-6 ml-6 hover:scale-105 transition-all cursor-pointer'>
                <img
                    src={unsplashImageUrl || "/Gemini.jpg"} 
                    className='w-[130px] h-[130px] rounded-xl'
                    alt={item?.placeName}
                />
                <div>
                    <h2 className='font-bold text-lg'>{item?.placeName}</h2>
                    <p className='font-xl text-pretty'>{item?.placeDetails}</p>
                    <p className='text-purple-700 '>Travel Time: {item?.travelTime}</p>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
