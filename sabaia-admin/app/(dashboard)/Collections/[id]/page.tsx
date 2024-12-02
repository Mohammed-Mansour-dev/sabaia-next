"use client"

import CollecForm from "@/app/_components/CollectionForm.tsx/CollecForm"
import Loading from "@/components/Loading"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



const page =  () => {

 const {id} =useParams()
const [collecDetails , setCollecDetails ] = useState<CollectionType | null>(null)
const [loading , setLoading ] = useState(false)

const getCollecDetails_ = async () =>{
  try {
    setLoading(true)
const res =await fetch(`/api/collection/${id}`,{
  method: 'GET'
})

const data =await res.json();

setCollecDetails(data);
setLoading(false)

  } catch (error) {
    console.log(error);
  toast.error("error getting collection ");
  }
}

useEffect(() =>{
  getCollecDetails_()
 },[id]);


  return loading ? <Loading /> :(
    <CollecForm initialData={collecDetails} />
  )
}

export default page