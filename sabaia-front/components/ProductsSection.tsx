import { getProducts_ } from '@/lib/actions/actions'
import React from 'react'
import ProCard from './ProCard'

const ProductsSection =async () => {

const products = await getProducts_()


  return (

    // wrapper
    <div>


  {/* title */}
  <div className="py-5">
            <h1 className='font-Roboto text-center
    text-2xl font-semibold md:text-4xl' >Products</h1>
          </div>
          

        
{
    !products || products.length === 0 ? (
        <div className="">
           <p className='text-center' >
            No products found.
           </p>
        </div>
    ) : (
        <div className="grid grid-cols-2 px-5 md:grid-cols-3 gap-3 lg:grid-cols-4  mx-auto ">
          
        
          
          
            {
              products.map((product :ProductType)  =>(
                <ProCard key={product._id} product={product} />
              ))
            }
        </div>
    )
}




    </div>
  )
}

export default ProductsSection