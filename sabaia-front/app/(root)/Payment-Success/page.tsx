"use client"

import { useCart } from '@/lib/store/useCart';
import Link from 'next/link';
import React, { useEffect } from 'react'

const SuccessfulPayment = () => {

const cart =useCart();

  useEffect(() => {
cart.clearCart();
  },[])


  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5 ' >
    <p className="text-red-1 font-Roboto font-semibold text-2xl " >Successful Payment</p>
    <p>Thanks for your purchase</p>
    <Link href="/" className='
    p-4 border text-base font-medium font-Roboto transition-all
    con_btn relative z-20
    duration-300
    hover:text-white text-neutral-900  bg-white
    ' >
    CONTINUE TO SHOPPING
    </Link>
    </div>
  )
}

export default SuccessfulPayment;