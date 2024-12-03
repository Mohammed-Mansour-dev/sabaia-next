"use client"

import ProductForm from '@/app/_components/Products/ProductForm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const SingleProPage =  () => {

const {productId}  =  useParams();
const [singleProData , setSingleProData ] = useState<ProTypeWithCollec | null>(null)

const getSinglePro_ = async ()=>{
    try {
        const res = await fetch(`/api/products/${productId}`,{
            method:"GET"
        });
    
        const data = await res.json();
       setSingleProData(data);
      
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    toast.error("failed fetching product ")
    }
}


useEffect(()=>{
getSinglePro_()
},[])


  return (
    <div>
       
       <ProductForm initialData={singleProData} />
    </div>
  )
}

export default SingleProPage