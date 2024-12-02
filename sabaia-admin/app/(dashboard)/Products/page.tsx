"use client"

import { columns } from '@/app/_components/Products/ProCol'
import { DataTable } from '@/components/CustomUi/DataTable'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter} from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Products = () => {

const [loading , setLoading] = useState(false)
const router =useRouter();
const [prosData , setProsData ] = useState([])



// get all products
const getProducts_ = async ()=>{

try {
setLoading(true)
const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/products`,{
    method: 'GET'
})

const data = await res.json();
setProsData(data);

} catch (error) {
    console.log(error)
    toast.error("failed to get products, please try again")
}setLoading(false)}


useEffect(()=>{
    getProducts_()
},[])


  return loading ? (
   <Loading />
  ) : (
    <div className="py-5 px-10 " >

    {/* head */}
    <div className="">
    {/* title & create collection button */}
     <div className="flex items-center pb-5 justify-between " >
      <h1 className="text-heading2-bold text-grey-1 font-bold ">Products</h1>
    
    <Button onClick={()=> router.push("Products/New")} className="bg-blue-1 text-white
    md:text-[16px] font-normal text-[14px]
    " >
      <Plus />
      Create Product</Button>
    
     </div>
    {/* seprator */}
    <Separator className="bg-grey-1" />
    
    </div>
    
    
          {/* table */}
        <div className="py-7" >
        <DataTable columns={columns} data={prosData} searchKey="title" />
        </div>
    
    
        </div>
  )
}

export default Products