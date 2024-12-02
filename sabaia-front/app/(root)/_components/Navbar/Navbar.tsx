"use client"


import CartButton from '@/components/CartButton'
import { useAuth, UserButton } from '@clerk/nextjs'
import {  Menu,   Search,   UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Navbar = () => {

const user =useAuth();
const pathname =usePathname()
const [isOpen , setIsOpen ] = useState(false)
const [query , setQuery ] = useState("");

const router =useRouter();

  return (
 <div className='sticky top-0 backdrop-blur-lg z-50' >
    {/* // wrapper */}
    <div className='flex relative z-20 gap-3 justify-between items-center pt-3 pb-4 px-4' >
        
{/* logo */}
<div className="shrink-0">
<Link href="/">
  <img src="/SABAIA.svg" className='w-32 max-sm:w-28' alt="" />
</Link>
</div>


{/*  middle links for md screens */}
<div className="max-md:hidden gap-4 flex ">
    <Link className={`text-neutral-800 ${pathname === "/" && "text-red-600 "}
    hover:text-[#694429] font-Roboto font-medium
     text-lg `} href={"/"} >Home</Link>
    <Link className={`text-neutral-800 ${pathname === "/Wishlist" && "text-red-600 "}
    hover:text-[#694429] font-Roboto font-medium
     text-lg `} href={"/Wishlist"} >Wishlist</Link>
    <Link className={`text-neutral-800 ${pathname === "/Orders" && "text-red-600 "}
    hover:text-[#694429] font-Roboto font-medium
     text-lg `} href={"/Orders"} >Orders</Link>
</div>



{/* search input */}
<div className="border border-neutral-500 text-neutral-700 pr-0 rounded-lg
font-Roboto px-3 py-1 flex items-center justify-between ">
<input type="text" className='flex-1 max-w-52
outline-none bg-transparent max-sm:max-w-24
'
onChange={(e)=>setQuery(e.target.value)}
value={query}
placeholder='Search...'
/>
<button disabled={query === ""} onClick={()=>router.push(`/Search/${query}`)} className='cursor-pointer pr-3
 hover:text-red-400 ' >
<Search />
</button>
</div>





{/* cart & user */}
<div className="flex gap-3 max-sm:gap-2 items-center">

{/* cart*/}
<div className="max-sm:hidden">
  <CartButton />
</div>

{/* menu icon */}
<div className="relative md:hidden ">
 
  <div onClick={()=> setIsOpen(!isOpen)} className=' cursor-pointer hover:text-neutral-600 ' >
  <Menu />
  </div>


{/* dropdown */}

{
isOpen && (<>
<div onClick={()=>setIsOpen(!isOpen)} className='fixed  h-screen inset-0 bg-transparent z-0 ' />
<div className="absolute right-2/3 top-10 bg-gray-100 rounded-md shadow-lg z-40 border flex flex-col  ">
  <Link onClick={()=>setIsOpen(false)} className='font-Roboto px-5 py-2 transition-all text-lg text-neutral-800 rounded-md hover:text-white  hover:bg-gray-600  ' href="/">
  Home
  </Link>
  <Link onClick={()=>setIsOpen(false)} className='font-Roboto px-5 py-2 transition-all text-lg text-neutral-800 rounded-md hover:text-white  hover:bg-gray-600  ' href="/">
  Orders
  </Link>
  <Link onClick={()=>setIsOpen(false)} className='font-Roboto sm:hidden px-5 py-2 transition-all text-lg text-neutral-800 rounded-md hover:text-white  hover:bg-gray-600  ' href="/">
  Wishlist
  </Link>

  <div  onClick={()=>setIsOpen(false)}  className='sm:hidden' >
  <CartButton />

  </div>



</div>
</>)}

</div>

{/* user icon */}
<div className="">

{
  user.isSignedIn ? (
   <div>
    <UserButton  />
   </div>
  ) : (
    <Link href="/sign-in" >
    <UserCircle2 />
    </Link>
  )
}




</div>

</div>






    </div>
 </div>
  )
}

export default Navbar