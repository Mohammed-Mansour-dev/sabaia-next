import { getOrders_ } from '@/lib/actions/actions';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';

import React from 'react'

const page = async () => {

const { userId } =await auth();

const orders = await getOrders_(userId as string);


  return (
    <div className="px-10 py-5 max-sm:px-3 font-Roboto">
    <p className="font-bold text-2xl my-10">Your Orders</p>
    {!orders ||
      (orders.length === 0 && (
        <p className="font-bold text-xl my-5">You have no orders yet.</p>
      ))}

    <div className="flex flex-col gap-10">
      {orders?.map((order: OrderType) => (
        <div key={order._id} className="flex flex-col gap-8 p-4 hover:bg-grey-1">
          <div className="flex gap-20 max-md:flex-col max-md:gap-3">
            <p className="font-semibold text-xl ">Order ID: {order._id}</p>
            <p className="font-semibold text-xl ">
              Total Amount: ${order.totalAmount}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {order.products.map((orderItem: OrderItemType) => (
              <div key={orderItem._id} className="flex gap-4">
                <Image
                  src={orderItem.product.media[0]}
                  alt={orderItem.product.title}
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between">
                  <p className="font-medium text-neutral-700 text-base">
                    Title:{" "}
                    <span className="font-semibold text-base text-black">
                      {orderItem.product.title}
                    </span>
                  </p>
                  {orderItem.color && (
                    <p className="font-medium text-neutral-700 text-base">
                      Color:{" "}
                      <span className="font-semibold text-base text-black">
                        {orderItem.color}
                      </span>
                    </p>
                  )}
                  {orderItem.size && (
                    <p className="font-medium text-neutral-700 text-base">
                      Size:{" "}
                      <span className="font-semibold text-base text-black">
                        {orderItem.size}
                      </span>
                    </p>
                  )}
                  <p className="font-medium text-neutral-700 text-base">
                    Unit price:{" "}$
                    <span className="font-semibold text-base text-black">{orderItem.product.price}</span>
                  </p>
                  <p className="font-medium text-neutral-700 text-base">
                    Quantity:{" "}
                    <span className="font-semibold text-base text-black">{orderItem.quantity}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default page
export const dynamic = "force-dynamic";