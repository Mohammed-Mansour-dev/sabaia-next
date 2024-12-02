import { useUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';




interface HeartFavoriteProps {
  product_id: string;
  updateSignedInUser?: (updatedUser: UserType) => void;
}



const HeartWish = ({product_id,updateSignedInUser }:HeartFavoriteProps) => {



    const [loading , setLoading ] = useState(false)
    const [isLiked , setIsLiked ] = useState(false);
    const [signedInUser , setSignedInUser ] = useState<UserType | null>(null)
    
    const {user} = useUser();
    




// store the user in the database
const getUser_ = async ()=>{
    try {
      setLoading(true);
      const res =await fetch('/api/user');
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
      setIsLiked(data.wishList.includes(product_id))
    
    } catch (error) {
      console.log("get_user",error)
    }
    }
    
    useEffect(()=>{
    if(user){
      getUser_();
    }
    },[user])

// add & remove from wish list
const handleLike_ = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
      if(!user){
       toast.error("Please sign in to add to wish list")
       return;
      }
    
     try {
       
   setLoading(true);
   
   const res = await fetch('/api/user/wishList',{
     method:'POST',
     body:JSON.stringify({productId :product_id})
   })
   
   const data = await res.json();
   
   setSignedInUser(data);
   
   setIsLiked(data.wishList.includes(product_id));
   updateSignedInUser && updateSignedInUser(data);
     } catch (error) {
       console.log("wishlist_POST",error)
     }
   }
   

  return (
    <div>
          <button onClick={handleLike_} className={``} >
    <Heart className={isLiked ? "text-[red]" : "" } fill={isLiked ? "red" : "white"} />
   </button>
    </div>
  )
}

export default HeartWish