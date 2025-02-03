import React, { useState } from 'react'
import {Button} from '@/components/ui/button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogFooter
} from "@/components/ui/dialog.jsx"
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';
function Header() {
  const user=JSON.parse(localStorage.getItem('user'))
   const[dialog,setdialog]=useState(false)


   const login=useGoogleLogin(
    {
      onSuccess:(res)=>{console.log(res);GetUserProfile(res)},
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
        console.log("User profile:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setdialog(false);
        window.location.reload()
    
      })
      .catch((error) => console.error("Error fetching user profile:", error));
    
  }
  return (

    <div className='p-2 shadow-sm flex justify-between items-center px-5 z-10'>
      <img src='/logo.svg'/>
     <div>
        {

        user?
        <div className='flex items-center gap-3'>
         <a href='/create-trip'>
          <Button variant="outline" 
          className="rounded-full text-lg"> + Create Trip</Button>
          </a>
        <a href='/my-trips'>
          <Button variant="outline" 
          className="rounded-full text-lg">My Trips</Button>
          </a>
          <Popover>
          <PopoverTrigger>
          <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
          </PopoverTrigger>
          <PopoverContent>
          <a href='/'>
          <h2 className='cursor cursor-pointer' onClick={
            ()=>{
              googleLogout();
              localStorage.clear()
              window.location.reload()
            }
          }> LogOut </h2>
          </a>
          </PopoverContent>
          </Popover>
        </div>:<Button onClick={()=>setdialog(true)}>Sign In</Button>
         }
      
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


export default Header

