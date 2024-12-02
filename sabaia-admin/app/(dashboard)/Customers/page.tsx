"use client"

import { columns } from "@/app/_components/customers/CustomersCol";
import { DataTable } from "@/components/CustomUi/DataTable";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";


const page =  () => {

const [loading , setLoading ] = useState(false)
const [customers , setCustomers ] = useState([])

// get customers function
const getCustomers_ = async () => {
  try {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/customers`);
    const customers = await res.json();
setCustomers(customers)
setLoading(false);


  } catch (error) {
    console.log("[get_Orders]", error )
  }
}



useEffect(()=>{
  getCustomers_()
},[])


  return loading ? (<Loading />)  : (
    <div className="px-10 py-5 " >
    
    <p className="text-heading2-bold   " >Customers</p>
    <Separator className="bg-grey-1 my-5 " />

    <DataTable columns={columns} data={customers} searchKey="name"  />
    
    </div>
  )
}

export default page
export const dynamic = "force-dynamic";