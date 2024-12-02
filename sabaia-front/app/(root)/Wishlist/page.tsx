"use client"


import Loading from '@/components/Loading';
import ProCard from '@/components/ProCard';
import { getProduct_ } from '@/lib/actions/actions';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const page = () => {

const {user} =useUser();

const [loading , setLoading ] = useState(false);
const [signedInUser , setSignedInUser ] = useState<UserType | null>(null)
const [wishlist , setWishlist ] = useState<ProductType[] >([])


// get the user
const getUser =async ()=>{
    try {

        const res = await fetch('/api/user');
        const data = await res.json();

        setSignedInUser(data);
        setLoading(false);
  
    } catch (error) {
        console.log("[users_get_wishlist]")
    }
}

useEffect(()=>{
if(user){
    getUser();
}
},[user])



const getWishlistData_ = async ()=>{
    setLoading(true);
    if(!signedInUser) return;

    const wishListProducts = await Promise.all(
        signedInUser.wishList.map(async (productId:string) => {
            const res = await getProduct_(productId);
            return res;
           
        })
    )
  
    setWishlist(wishListProducts);
    setLoading(false);
    
}


useEffect(()=>{

if(signedInUser){
      getWishlistData_();
}
},[signedInUser])

const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }




  return loading ? (<Loading />) : (
    <div className="px-10 font-Roboto py-5">
      <p className=" font-bold text-2xl my-10">Your Wishlist</p>
      { !loading &&  wishlist.length  === 0 && (
        <p>No items in your wishlist</p>
      )}

      <div className="flex flex-wrap  gap-16">
        {wishlist.map((product) => (
          <ProCard key={product._id} updateSignedInUser={updateSignedInUser} product={product}/>
        ))}
      </div>
    </div>)
}

export default page
export const dynamic = "force-dynamic";