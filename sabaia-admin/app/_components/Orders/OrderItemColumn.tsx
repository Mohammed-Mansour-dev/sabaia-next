
"use client"

import {ColumnDef} from "@tanstack/react-table"
import Link from "next/link"



export const columns: ColumnDef<OrderItemType>[] = [
    {
      accessorKey: "product",
      header: "Order",
      cell:({row})=> (<Link
        className="hover:text-red-1 text-base-medium hover:underline  "
        href={`/Products/${row.original.product._id}`} >{row.original.product.title}</Link>)
    },
    
    {
      accessorKey: "color",
      header: "Color",
    },
    {
        accessorKey: "sizes",
        header: "Size",
      },
    {
        accessorKey: "quantity",
        header: "Quantity",
       
      },
          
  ]













