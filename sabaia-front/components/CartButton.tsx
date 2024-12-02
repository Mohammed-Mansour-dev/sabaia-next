import { useCart } from '@/lib/store/useCart'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartButton = () => {
  const cart =useCart()

  return (
    <div>
        <Link href="/Cart" className="flex items-center max-sm:border-none
        hover:text-white hover:bg-neutral-800 transition-all
        gap-1 font-Roboto  px-2 py-1 border rounded-lg font-bold">
    <ShoppingCart />
    Cart ({cart.cartItems.length})
</Link>
    </div>
  )
}

export default CartButton