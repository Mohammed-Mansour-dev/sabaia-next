"use client"

import { useCart } from '@/lib/store/useCart'
import { useUser } from '@clerk/nextjs';
import { MinusCircle, Plus, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const Cart = () => {

const cartData =useCart();
const {user} =useUser();
const router = useRouter();

const cartrAmount = cartData.cartItems.reduce((sum, item) => sum + item.item.price * item.quantity ,0 )

const customer ={
  clerkId:user?.id,
email:user?.emailAddresses[0].emailAddress,
name:user?.fullName
}

const handleCheckout = async () =>{
try {
  if(!user){
    router.push("/sign-in")
  }else{
    const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`,{
      method:'POST',
      body:JSON.stringify({
        customer,
        cartItems:cartData.cartItems
      })
    })
    const data =await res.json();
    window.location.href=data.url
  }
  



} catch (error) {
  console.log("[checkout] _POST fro",error)
}
}



  return (
    // wrapper
    <div className='
    max-w-screen-xl mx-auto
    px-10 w-full pt-10 flex gap-6 md:gap-10 max-md:flex-col pb-20 ' >
      

      {/* left section */}
   <div className='md:w-2/3' >
      {/* title */}
      <div className="">
        <h1 className="text-2xl md:text-3xl font-Roboto font-bold text-gray-800">Shopping Cart</h1>
      <hr className='my-4' />
      </div>
      
{/* cart items */}
<div className="flex flex-col gap-5">

{/* cart item ui */}
{
cartData.cartItems.map(item => (
<div key={item.item._id} className=" hover:bg-gray-100 max-md:px-7 rounded p-3">

{/* image  */}
<div className='flex gap-3 max-md:flex-col ' >

  {/* image */}
<div className="">
  <Image src={item.item.media[0]}
  className='w-36 h-48 object-cover rounded-2xl max-md:w-full max-sm:h-56 max-md:h-96 '
  width={200} height={300} alt='Product image' />
</div>

{/* details */}
<div className="font-Roboto flex justify-between  flex-1 ">
  {/* texts */}
 <div className='flex flex-col gap-3' >
  {/* pro name */}
<h1 className='font-medium text-lg capitalize md:text-xl ' >{item.item.title}</h1>
{/* color */}
{ item.color && <p className={`capitalize text-neutral-600 text-base md:text-lg font-medium `} >{item?.color}</p>}
{/* size */}
{ item.size && <p  className='capitalize text-neutral-600 text-base md:text-lg font-medium '  >{item?.size}</p>}
{/* price */}
<h1 className='capitalize  text-lg md:text-xl font-medium' >${item.item.price}</h1>

 </div>

{/* quantity & trash */}
<div className="flex my-auto gap-1 select-none px-2 items-center">
<MinusCircle className='cursor-pointer size-5 hover:text-red-500 hover:scale-105 active:scale-95 ' onClick={()=> cartData.decreaseQuantity(item.item._id)} />
<p className='font-medium font-Roboto text-xl' >{item.quantity}</p>
<PlusCircle className='cursor-pointer size-5 hover:text-red-500 hover:scale-105 active:scale-95 '  onClick={()=> cartData.increaseQuantity(item.item._id)}  />
{/* delete product button */}
<Trash  onClick={() => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => {
                cartData.removeItem(item.item._id); // Perform the deletion
                toast.dismiss(t.id); // Dismiss the toast
                toast.success('Item deleted successfully'); // Show success message
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)} // Dismiss the toast without action
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  }}  className='ml-3 cursor-pointer hover:text-gray-500 ' />
</div>

</div>
</div>



</div>

))


}

</div>





   </div>


{/* summary section */}
<div className=" font-Roboto md:w-1/3 !h-full bg-neutral-200 px-3 md:px-10 py-2 mt-7 rounded-lg">

<h1 className='text-xl md:text-2xl font-medium mb-5 mt-3 ' >Summary ({cartData.cartItems.length}) {cartData.cartItems.length > 1 ? "items" : "item"} </h1>

{/* total amount */}
<div className="font-medium flex justify-between text-neutral-800 text-lg my-10 md:text-xl  items-center ">

<h1>Total Amount</h1>
<p>${cartrAmount}</p>
</div>


{/* check out btn */}
<button onClick={handleCheckout} className='w-full bg-white py-2 px-4 rounded-lg my-4 font-medium hover:bg-neutral-800 transition-all hover:text-white  ' >Proceed to Checkout</button>


</div>


      
       </div>
  )
}

export default Cart