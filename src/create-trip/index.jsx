
import React,{useState,useEffect} from 'react'

import  {locations} from '../constants/locations.jsx'
import {budgetOptions, travellersList} from '../constants/options.jsx'
import { Button } from '../components/ui/button.jsx';
import { toast } from 'sonner';
import { AI_PROMPT, chatSession } from '../service/AIModal.jsx';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogFooter
} from "@/components/ui/dialog.jsx"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/fireBaseConfig"; // If you use absolute imports in Vite

import { useNavigate } from 'react-router-dom';
// import { db } from "fireBaseConfig.jsx";

const CreateTrip = () => {
    const[dialog,setdialog]=useState(false)
    const [selectedLocation, setSelectedLocation] = useState("");
    const[formdata,setformdata]=useState([]);
    const[loading,setloading]=useState(false)

    const navigate=useNavigate()
    const login=useGoogleLogin(
      {
        onSuccess:(res)=>{GetUserProfile(res)},
        onError:(error)=>{console.error(error)}
      }
    )
    const GetUserProfile = (tokenInfo) => {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
         
          localStorage.setItem("user", JSON.stringify(response.data));
          setdialog(false);
          Trip();
        })
        .catch((error) => console.error("Error fetching user profile:", error));
      
    }
    const Trip=async()=>{
      
      const user = localStorage.getItem("user");
   
      if(!user){
        setdialog(true)
        return;
      }
      if(formdata?.NoOfDays>7&& !formdata?.location||!formdata?.budget|| !formdata?.traveller){
        toast("Please fill all details")
        return;
      }
      setloading(true)
      const FINAL_PROMPT=AI_PROMPT
      .replace('{location}',formdata?.location)
      .replace('{totalDays}',formdata?.NoOfDays)
      .replace('{traveller}',formdata?.traveller)
      .replace('{budget}',formdata?.budget)
      .replace('{Days}',formdata?.NoOfDays)
      
      console.log(FINAL_PROMPT);
      const result=await chatSession.sendMessage(FINAL_PROMPT)
      console.log("AI Response:", result?.response?.text());

      setloading(false)

      SaveTrip(result?.response?.text())
    }
  


const SaveTrip=async(TripData)=>{
  setloading(true)
  const user=JSON.parse(localStorage.getItem('user'))
  const docId=Date.now().toString()
  await setDoc(doc(db, "AITrip", docId), {
  userSelection:formdata,
  tripdata:JSON.parse(TripData),
  userEmail:user?.email,
  id:docId
})

setloading(false)
navigate('/view-trip/'+docId)
};
    const handleLocationSelect = (locationName) => {
      setSelectedLocation(locationName);
    };

    const handleInputChange=(name,value)=>{
        if(name=='NoOfDays'&&value>7){
          console.log(`Please Enter Value less than ${value} or less than 7`);
          return;
        }
          setformdata(
            {
             ...formdata,
             [name]:value,
            }
          )
    }
    useEffect(
    ()=>{ console.log(formdata)},  
    [formdata])
  
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Tell us your Travel Preferences 🗺️ 🏝️</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just Provide Some Basic Information so that we can give you Suggestions</p>
        <div className='mt-10'>
            <div>
                <h2 className='text-xl my-3 font-medium'> What is your preferred destination?</h2>
                <input
        type="text"
        placeholder={selectedLocation || "Select a place"}
        readOnly
        className="p-2 border rounded"
      />
      <div className="mt-3">
        <select
          onChange={(e) => { 
            handleInputChange('location',e.target.value)
            handleLocationSelect(e.target.value);}}
          className="p-2 border rounded"
        >
          <option value="">Select a city</option>
          {locations.map((location) => (
            <option key={location.id}>
              {location.name}, {location.country}
            </option>
          ))}
        </select>
         </div>
            </div>
            <div>
              <h2 className='text-xl my-3 font-medium'>How many days are you planning for the trip?</h2>
              <input type="number" placeholder={'ex.3'} onChange={(e)=>handleInputChange('NoOfDays',e.target.value)}/>
            </div>
            <div>
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2> 
          <div className='grid grid-cols-3 gap-5'>
            {budgetOptions.map((item,index)=>(
              <div key={index} 
             onClick={()=>handleInputChange('budget',item.title)} 
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formdata?.budget==item.title && 'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
             </div>
             <div>
          <h2 className='text-xl my-3 font-medium'>Whom are you travelling for this fantabulous trip?</h2> 
          <div className='grid grid-cols-3 gap-5'>
            {travellersList.map((item,index)=>(
              <div key={index} 
              onClick={()=>handleInputChange('traveller',item.people)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formdata?.traveller==item.people && 'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
            </div>
        </div>
        <div className='text-center rounded-lg my-5 cursor-pointer hover:focus-visible:bg-red-500'>
       <Button disabled={loading} onClick={Trip}> {loading?<AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate Trip'}</Button>
        </div>
        <Dialog open={dialog} onClose={() => setdialog(false)}>
  <DialogContent>
   
    <DialogDescription>
    <img src="/logo.svg"/>
    <h2 className='font-bold text-2xl mt-7 text-cente text-black font-serif'>Sign in with Google</h2>
    <Button onClick={login} className='w-full mt-5 text-white flex gap-4 items-center'>
    <FcGoogle className='h-7 w-7' /> Sign in with Google</Button>
    </DialogDescription>
    <DialogFooter>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default CreateTrip

