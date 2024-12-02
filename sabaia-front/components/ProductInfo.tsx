"use client"

import { MinusCircle, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import HeartWish from './HeartWish'
import { useCart } from '@/lib/store/useCart'

const ProductInfo = ({proData}:{proData:ProductType}) => {
  const addToCart =useCart((state) => state.addItem)
 const decreaseQuantity =useCart((state) => state.decreaseQuantity)
 const increaseQuantity =useCart((state) => state.increaseQuantity)

const dd =useCart((state)=>state.cartItems)

const ss =dd.find((item) => item.item._id === proData._id)

    const [colorS , setColorS ] = useState(proData.colors[0])
    const [sizeS , setSizeS ] = useState(proData.sizes[0])
 const [quantity, setQuantity] = useState(ss ? ss.quantity : 1);


    return (
    // wrapper
    <div className='max-w-96 flex-col flex gap-y-0.5 h-full  ' >
        {/* title */}
        <div className='flex justify-between items-center' >
        <h1 className='text-3xl lg:text-4xl font-bold' >{proData.title}</h1>
       <HeartWish product_id={proData._id} />
        </div>
        {/* category */}
<p className='text-gray-400 py-2 text-lg font-medium capitalize ' >Category: <span className='text-neutral-900' >{proData.category}</span> </p>
{/* price */}
<h1 className='font-bold text-xl lg:text-3xl  ' >${proData.price}</h1>

{/* description */}
<div className="pt-2 ">
    <h2 className='text-gray-400 text-xl lg:text-2xl py-1 ' >Description:</h2>
    <p className='text-lg lg:text-xk pb-3' >{proData.description}</p>
</div>


{/* colors */}
{ proData.colors && (<div className="">
    <h2 className='text-xl text-gray-400 py-2' >Colors:</h2>
    <ul className='flex gap-3' >
        {proData.colors.map(color => (
            <li 
            onClick={() =>setColorS(color)}
            className={` ${color === colorS && "bg-neutral-900 text-white"}
            border px-3 py-1 text-lg cursor-pointer capitalize font-Roboto border-neutral-950 rounded-md
            `} key={color}>{color}</li>
        ))}
    </ul>
</div>)}

{/* Sizes */}
{ proData.sizes.length > 0 && (<div className="">
    <h2 className='text-xl text-gray-400 py-2' >Sizes:</h2>
    <ul className='flex gap-3' >
        {proData.sizes.map(size => (
            <li 
            onClick={() =>setSizeS(size)}
            className={` ${size === sizeS && "bg-neutral-900 text-white"}
            border px-3 py-1 text-sm cursor-pointer capitalize font-Roboto border-neutral-950 rounded-md
            `} key={size}>{size}</li>
        ))}
    </ul>
</div>)}


{/* quantity */}
<div className=" mb-4">
<h2 className='text-xl text-gray-400 pt-4' >Quantity:</h2>

<div className='flex gap-3 pt-1 text-lg  items-center select-none ' >
<PlusCircle className='cursor-pointer active:scale-90 ' onClick={()=>{
    increaseQuantity(proData._id)
    setQuantity(quantity < 20 ? quantity + 1 : quantity)}} />

<p className='text-2xl font-bold' >{quantity}</p>

<MinusCircle className='cursor-pointer active:scale-90 ' onClick={()=>{
    decreaseQuantity(proData._id)
    setQuantity(quantity > 1 ? quantity - 1 : quantity)}} />
</div>



</div>

{/* add to cart btn */}

<button
onClick={()=>addToCart({item:proData  ,quantity,color:colorS ,size :sizeS})}
className='border-2 hover:bg-neutral-900  hover:text-white transition-all
 border-neutral-900 w-full mt-auto rounded-lg py-2 my-4 text-black text-xl ' >Add To Cart</button>

    </div>
  )
}

export default ProductInfo