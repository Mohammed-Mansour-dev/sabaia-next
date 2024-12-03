"use client"

import { columns } from "@/app/_components/CollectionForm.tsx/CollecCols"
import { DataTable } from "@/components/CustomUi/DataTable"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CollectionsPage = () => {

  const router =useRouter();




const [collecData, setCollecData] = useState([])
const [loading , setLoading ] = useState(false)

const getCollections_ = async ()=>{
try {
    setLoading(true)
const res = await fetch(`/api/collection`,{
    method: 'GET'
});
const data = await res.json();
setCollecData(data);

setLoading(false)
} catch (error) {
    console.log("[collection_Get]",error);
setLoading(false)
}

}




useEffect(()=>{
    getCollections_()

},[])


  return loading ? (
   <Loading />
  ) : (
    // wrapper
    <div className="py-5 px-10 " >

{/* head */}
<div className="">
{/* title & create collection button */}
 <div className="flex items-center pb-5 gap-3 justify-between " >
  <h1 className="text-heading2-bold text-grey-1 font-bold ">Collections</h1>

<Button onClick={()=> router.push("Collections/New")} className="bg-blue-1 text-white
md:text-[16px] font-normal text-[14px]
" >
  <Plus />
  Create Collection</Button>

 </div>
{/* seprator */}
<Separator className="bg-grey-1" />

</div>


      {/* table */}
    <div className="py-7" >
    <DataTable columns={columns} data={collecData} searchKey="title" />
    </div>


    </div>
  )
}

export default CollectionsPage