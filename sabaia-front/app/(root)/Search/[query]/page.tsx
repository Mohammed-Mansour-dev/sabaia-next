import ProCard from '@/components/ProCard';
import { getSearchProducts } from '@/lib/actions/actions';
import React from 'react'

const page = async ({params}:{params:{query:string}}) => {

const {query} =await params;

const data = await getSearchProducts(query)


const decodedQuery =decodeURIComponent(query)

  return (
    <div className='px-10 py-5 ' >

        <p className='font-Roboto font-semibold text-2xl ' >Search results for <span className='text-neutral-500' >
        {decodedQuery}
        </span></p>

        {
!data || data.length === 0 ? (
    <p className='pt-10 font-Roboto text-xl ' >No results found</p>
) :(

<div className="flex flex-wrap pt-14 gap-10 justify-center ">
    {
        data?.map((item:any)=>(
            <ProCard product={item} key={item._id}  />
        ))
    }
</div>


)




        }
    
    </div>
  )
}

export default page
export const dynamic = "force-dynamic";