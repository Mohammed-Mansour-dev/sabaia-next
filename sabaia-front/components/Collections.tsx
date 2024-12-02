import { getCollections_ } from '@/lib/actions/actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Collections = async () => {




    const collections = await getCollections_();


  return (
    // wrapper
    <div className='py-10 md:py-24 ' >
        {/* ddddddddddd */}
<div className="">

{/* collections Title */}

<div className="">
    <h1 className='font-Roboto text-center
    text-2xl font-semibold md:text-4xl
    ' >Collections</h1>
</div>

{/* collections images */}
<div className="flex gap-4 w-fit mx-auto pt-4 flex-wrap ">

{

!collections || collections.length === 0 ? (
    <div className="">
        <p>No Collections found

        </p>
    </div>
): (
      collections.map((collection:CollectionType) => (
        <Link title={collection.title} href={`Collection/${collection._id}`} key={collection._id} className='md:w-96 mx-auto md:h-48 hover:scale-105 transition-all h-32 w-64 ' >
        <Image className='w-full h-full rounded-md ' src={collection.image} width={300} height={300} alt='Collection' />
        </Link>
    ))  
)




}



</div>



</div>

    </div>
  )
}

export default Collections