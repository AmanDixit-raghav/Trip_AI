import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {useParams} from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from './components/InfoSection';
import { db } from "@/service/fireBaseConfig"; 
import Hotels from './components/Hotels';
import PlaceCardItem from './components/PlaceCardItem';
import PlacesToVisit from './components/PlacesToVisit';

function ViewTrip() {
    const {tripId}=useParams();
    const[trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrip',tripId);
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            console.log("document:",docSnap.data())
            setTrip(docSnap.data())
            console.log(trip)
        }
        else{
            console.log('No Such Document');
            toast('No trip Found!')
            
        }
    }
    return(
    <>
    <InfoSection trip={trip} />
    <Hotels trip={trip}/>
    <PlacesToVisit trip={trip}/>
    </>

    )
  
}

export default ViewTrip