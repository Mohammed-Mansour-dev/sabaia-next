"use client"

import { columns } from "@/app/_components/Orders/OrderCulomn";
import { DataTable } from "@/components/CustomUi/DataTable";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";


const page =  () => {

const [loading , setLoading ] = useState(false)
const [orders , setOrders ] = useState([])

// get orders 
const getOrders_ = async () => {
  try {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/orders`);
    const orders = await res.json();
setOrders(orders)
setLoading(false);


  } catch (error) {
    console.log("[get_Orders]", error

    )
  }
}

useEffect(()=>{
  getOrders_()
},[])


  return loading ? (<Loading />)  : (
    <div className="px-10 py-5 " >
    
    <p className="text-heading2-bold   " >Orders</p>
    <Separator className="bg-grey-1 my-5 " />

    <DataTable columns={columns} data={orders} searchKey="_id"  />
    
    </div>
  )
}

export default page
export const dynamic = "force-dynamic";