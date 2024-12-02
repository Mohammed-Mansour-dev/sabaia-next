"use client"

import Delete from "@/components/CustomUi/Delete"
import {ColumnDef} from "@tanstack/react-table"
import Link from "next/link"



export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell:({row})=> (<Link
        className="hover:text-red-1 text-base-medium hover:underline  "
        href={`/Collections/${row.original._id}`} >{row.original.title}</Link>)
    },
    {
      accessorKey: "products",
      header: "Products",
      cell:({row})=> <p>{row.original.products.length}</p>
    },
    {
      id: "actions",
      cell: ({row}) => <Delete item="collection" collecId={row.original._id} />
    },
  ]