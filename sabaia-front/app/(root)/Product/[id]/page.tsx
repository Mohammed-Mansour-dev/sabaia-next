import Gallery from '@/components/Gallery';
import ProCard from '@/components/ProCard';
import ProductInfo from '@/components/ProductInfo';

import { getProduct_, getRelatedProducts_ } from '@/lib/actions/actions';
import Image from 'next/image';
import React from 'react'

const page = async ({params}:{params:{id:string}}) => {

  const {id} =await params;

const proData = await getProduct_(id)

const relatedProducts = await getRelatedProducts_(id)



  return (
<div>
    {/* // wrapper */}
    <div className='md:grid w-full gap-y-9 flex pt-7 flex-col pb-10 px-5 grid-cols-2 font-Roboto gap-10 max-w-screen-xl md:px-10 mx-auto  ' >
        
{/* media section */}
<div className='' >
<Gallery media={proData.media} />
</div>

{/* details section */}
<div className="">
  <ProductInfo proData={proData} />
</div>

    </div>



{/* related products */}
<div className="pt-10 pb-24 px-10">
{/* title */}
<div className="">
  <h2 className="text-2xl md:text-3xl text-center font-Roboto font-bold text-gray-800">Related Products</h2>
</div>

{/* products */}
{
relatedProducts.length === 0 ? (
  <div className="max-md:w-full w-1/2 mx-auto ">
    <Image alt='no product found' className='w-full' src="/noproduct.webp" width={500} height={500} />
  </div>
  ): (
    

<div className="grid grid-cols-2 py-7 w-full sm:grid-cols-3 md:grid-cols-4 ">
{ relatedProducts.map((product:ProductType, index:any) => (
  <div key={index} className='mx-auto' >
    <ProCard  product={product}/>
  </div>
  ))
 
}
</div>
  )


}





</div>





</div>
  )
}

export default page
export const dynamic = "force-dynamic";