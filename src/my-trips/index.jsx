import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "@/service/fireBaseConfig";  
import UserCardItem from './Components/UserCardItem';

function MyTrips() {
  const navigate = useNavigate();
  const[userTrips,setUserTrips]=useState([])
  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const userData = localStorage.getItem('user');
    
    const user = JSON.parse(userData);
    if (!userData) {
      navigate('/');
      return;
    }
 
 setUserTrips([])

    const q = query(collection(db, 'AITrip'), where('userEmail', '==', user.email));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prev=>[...prev,doc.data()])
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return( <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
    <h2 className='font-bond text-3xl mb-5 text-emerald-600'><i>My Trips</i></h2>
    
    <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
        {userTrips.map((trip,index)=>(
            <div key={index}>
            <UserCardItem trip={trip}/>
            </div>
        ))}
    </div>


    </div>);
}

export default MyTrips;
