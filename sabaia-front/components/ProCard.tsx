"use client"

import { useUser } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import HeartWish from './HeartWish'

const ProCard = ({product ,updateSignedInUser}:{product:ProductType ,updateSignedInUser?:(updatedUser: UserType)=>void}) => {

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
  setIsLiked(data.wishList.includes(product._id))

} catch (error) {
  console.log("get_user",error)
}
}

useEffect(()=>{
if(user){
  getUser_();
}
},[user])





  return (
    <Link href={`/Product/${product._id}`} className='max-w-60 h-80 w-full ' >
        
{/* card image  */}
<div className={`w-full h-3/4 bg-slate-200 `}>
    <Image className='w-full h-full object-cover z-30 ' src={product.media[0]} width={200} height={280} alt='product'  />
</div>
{/* pro details */}
<div className="pt-1 px-1">
  {/* pro name */}
  <h1 className='font-Roboto line-clamp-1 font-bold text-sm md:text-base  ' >{product.title}</h1>
  {/* category */}
  <p className='font-Roboto font-semibold text-gray-500 -mt-1 text-sm ' >{product.category}</p>
  {/* price & heart */}
  <div className="flex items-center justify-between pt-1">
    {/* price */}
    <p className='text-lg font-bold font-Roboto '> ${product.price}</p>
    {/* heart */}
 <HeartWish product_id={product._id} updateSignedInUser={updateSignedInUser} />
  </div>
</div>
    </Link>
  )
}

export default ProCard