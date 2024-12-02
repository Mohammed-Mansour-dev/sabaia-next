"use client"

import Delete from "@/components/CustomUi/Delete"
import {ColumnDef} from "@tanstack/react-table"
import Link from "next/link"



export const columns: ColumnDef<productFormPropsType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell:({row})=> (<Link
        className="hover:text-red-1 text-base-medium hover:underline  "
        href={`/Products/${row.original._id}`} >{row.original.title}</Link>)
    },
    {
      accessorKey: "category",
      header: "Category",
      cell:({row})=> <p>{row.original.category}</p>
    },
    {
      accessorKey: "collections",
      header: "Collections",
      cell:({row})=> <div>{row.original.collections.map((item: any,index)=>(
      <p key={index} >{item.title}</p>))}</div>
    },
    {
        accessorKey: "price",
        header: "Price($)",
        cell:({row})=> <p>${row.original.price}</p>
      },
    {
        accessorKey: "cost",
        header: "Cost($)",
        cell:({row})=> <p>{row.original.expense}</p>
      },
    {
      id: "actions",
      cell: ({row}) => <Delete item="product" collecId={row.original._id} />
    },
  ]