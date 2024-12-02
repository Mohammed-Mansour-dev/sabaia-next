"use client"

import { NAVLINKS } from '@/constants/constants'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Navbar = () => {

  const pathname =usePathname();
  const [dropDown , setDropDown ] = useState(false);
  return (
    <div
    className="lg:h-screen z-20 text-grey-1 lg:left-0 top-0 sticky bg-blue-2 shadow-xl "
    >
        
{/* wrapper */}
<div className="max-lg:py-4 max-lg:relative px-8 max-lg:flex items-center justify-between ">

{/* logo */}
<div className="lg:py-5 lg:mb-10 ">
<Link href="/">
  <img src="/SABAIA.svg" className='w-32' alt="" />
</Link>
</div>



{/* nav link */}
<div className="max-md:hidden">
  <nav className='lg:space-y-12  max-lg:flex items-center max-lg:gap-3 ' >
    {
NAVLINKS.map((nav,i) =>{
return(
<div key={i} >
<Link href={nav.link}  className={`  ${pathname === nav.link && "text-blue-1"}  flex hover:text-gray-800 items-center text-[18px] lg:text-[20px] font-semibold  gap-3 `} >
{/* nav icon */}
<div className='max-lg:hidden' >
{nav.icon}
</div>
{/* nav label */}
{nav.label}
</Link>
</div>
  
)})

    }
  </nav>
</div>


{/* for sm screens */}

{
    dropDown &&(

<>
<div className='fixed inset-0 z-[1] bg-transparent' onClick={()=>setDropDown(false)} />

    <div className="absolute z-10 top-16 right-[10%] md:hidden  ">
{/* nav link */}
<div className="">
  <nav className='space-y-12 bg-white shadow-2xl p-4 rounded-lg ' >
    {
NAVLINKS.map((nav,i) =>{
return(
<div key={i} >
<Link href={`${nav.link}`} onClick={()=> setDropDown(false)}  className='flex hover:text-gray-800 items-center text-[16px] font-semibold  gap-3 ' >
{/* nav icon */}
{nav.icon}
{/* nav label */}
{nav.label}
</Link>
</div>
  
)})

    }
  </nav>
</div>
</div>

</>

)}













{/* account and user logo */}
<div className='max-lg:flex max-lg:gap-5' >


{/* menu icon */}
<div onClick={()=> setDropDown(!dropDown)} className="md:hidden cursor-pointer ">
    <Menu />
</div>




    <label className='flex max-lg:scale-105 items-center gap-3 text-base-bold lg:mt-10' >
    <UserButton/>
   <div className="max-lg:hidden">
    Edit Profile
   </div>
    </label>
</div>


</div>






    </div>
  )
}

export default Navbar