import { columns } from '@/app/_components/Orders/OrderItemColumn';
import { DataTable } from '@/components/CustomUi/DataTable';
import React from 'react'

const SingleOrderPage = async ({params} :{params :{orderId:string}}) => {

const {orderId} =await params


const res = await  fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/orders/${orderId}`)

const {orderDetails,customer} = await res.json();

const { street ,city ,state ,postalCode ,country } =orderDetails.shippingAddress;


const formattedAddress = [ street ,city ,state ,postalCode ,country ].filter(Boolean).join(", ")


  return (
    <div className=' flex flex-col p-10 gap-5 ' >
        
<p className="text-base-bold">
    Order ID : <span className='text-base-medium' >{orderDetails._id} </span>
</p>

<p className="text-base-bold">
    Customer Name : <span className='text-base-medium' >{customer.name} </span>
</p>

<p className="text-base-bold">
    Shiping Address : <span className='text-base-medium' >{formattedAddress} </span>
</p>

<p className="text-base-bold">
    Total Paid : <span className='text-base-medium' >${orderDetails.totalAmount} </span>
</p>

<p className="text-base-bold">
    Shiping rate ID : <span className='text-base-medium' >{orderDetails.shippingRate
    } </span>
</p>



<div className="">
    <DataTable columns={columns} data={orderDetails.products}  searchKey='product' />
</div>


    </div>
  )
}

export default SingleOrderPage
export const dynamic = "force-dynamic";