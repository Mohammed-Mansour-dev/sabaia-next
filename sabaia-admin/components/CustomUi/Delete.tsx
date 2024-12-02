"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
  
interface DeletePropsType {
    collecId: string
    item: string
}



const Delete :React.FC<DeletePropsType> = ({collecId ,item}) => {

const [loading , setLoading ] = useState(false)
const itemType = item === "product" ? "products" : "collection"
const router =useRouter();

const onDelete_ = async () => {

try {
setLoading(true);
const res = await fetch(`/api/${itemType}/${collecId}`,{
    method: 'DELETE'
});

if(res.ok){
    toast.success(`${item} deleted successfully`)


setLoading(false);
    // Conditional navigation based on `item` type
    const destination = item === "product" ? "/Products" : "/Collections";
    router.replace(destination);
setTimeout(() => {
window.location.reload()
}, 1000);

  }else {
    toast.error(`Failed to delete ${item}, please try again.`);
  }


} catch (error) {
    console.log(`Delete ${item}`,error)
    toast.error(`Error deleting ${item} , please try again`)
}



}







  return (
    
  
<div>

<AlertDialog>
  <AlertDialogTrigger asChild > 
     <Button type='button' className='bg-red-1 text-white' >
       { loading ? <div className='animate-spin w-4 h-4 bg-black' /> : <Trash  className='h-4 w-4' />
        }
    </Button>
    </AlertDialogTrigger>

  <AlertDialogContent className='bg-white text-grey-1' >
    <AlertDialogHeader>
      <AlertDialogTitle   className='text-red-1' >Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your Collection
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>onDelete_()} className='bg-red-1 text-white' >Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog> 


</div>

  )
}

export default Delete