"use client"

import {ColumnDef} from "@tanstack/react-table"
import Link from "next/link"



export const columns: ColumnDef<productFormPropsType>[] = [
    {
      accessorKey: "_id",
      header: "Order",
      cell:({row})=> (<Link
        className="hover:text-red-1 text-base-medium hover:underline  "
        href={`/Orders/${row.original._id}`} >{row.original._id}</Link>)
    },
    
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
        accessorKey: "products",
        header: "Products",
      },
    {
        accessorKey: "totalAmount",
        header: "Total Amount",
       
      },
          {
        accessorKey: "createdAt",
        header: "Date",
       
      }
  ]