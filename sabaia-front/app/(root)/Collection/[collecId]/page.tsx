import ProCard from '@/components/ProCard';
import { getCollection_ } from '@/lib/actions/actions';
import Image from 'next/image';
import React from 'react'

const page = async ({params}:{params:{collecId:string}}) => {

const {collecId} =await params;


// getting the collection data 
const collecData = await getCollection_(collecId)



  return (
    // wrapper
    <div  className='md:px-10 px-5 py-14
    ' >
        

{/* img */}
<div className="w-full">
<Image priority className="w-full md:h-[400px] lg:h-[500px] xl:h-[600px] max-sm:object-contain object-cover rounded-xl " src={collecData.image}

width={1800} height={1000} alt='collection img' />
</div>

{/* title & description */}
<div className="text-center py-10 font-Roboto">
    <h1 className='  text-neutral-600 text-xl lg:text-3xl  md:text-2xl font-bold ' >{collecData.title}</h1>

<p className='pt-4 text-neutral-500 max-w-[550px] mx-auto ' >{collecData.description}</p>
</div>

{/* collection products */}

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 ">

{
collecData.products.map((item:ProductType)=>(
    <div className="" key={item._id} >
<ProCard product={item} />
    </div>
))


}


</div>


    </div>
  )
}

export default page
export const dynamic = "force-dynamic";