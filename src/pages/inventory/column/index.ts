// import { format } from "date-fns"
// import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Medicine } from "../types"
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   type ColumnDef,
//   type SortingState,
//   type ColumnFiltersState,
// } from "@tanstack/react-table"
// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"


// export const columns: ColumnDef<Medicine>[] = [
//     {
//       accessorKey: "name",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Name
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },  const columns: ColumnDef<Medicine>[] = [
//         {
//           accessorKey: "name",
//           header: ({ column }) => {
//             return (
//               <Button
//                 variant="ghost"
//                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//               >
//                 Name
//                 <ArrowUpDown className="ml-2 h-4 w-4" />
//               </Button>
//             )
//           },
//         },
//         {
//           accessorKey: "category.name",
//           header: "Category",
//         },
//         {
//           accessorKey: "manufacturer.name",
//           header: "Manufacturer",
//         },
//         {
//           accessorKey: "unit.name",
//           header: "Unit",
//         },
//         {
//           accessorKey: "sellPrice",
//           header: ({ column }) => {
//             return (
//               <Button
//                 variant="ghost"
//                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//               >
//                 Price
//                 <ArrowUpDown className="ml-2 h-4 w-4" />
//               </Button>
//             )
//           },
//           cell: ({ row }) => {
//             const price = parseFloat(row.getValue("sellPrice"))
//             return <div className="text-right">${price.toFixed(2)}</div>
//           },
//         },
//         {
//           accessorKey: "stock.quantity",
//           header: "Stock Status",
//           cell: ({ row }) => {
//             const quantity = row.getValue("stock.quantity") as number
//             return getStockStatus(quantity)
//           },
//         },
//         {
//           accessorKey: "stock.quantity",
//           header: ({ column }) => {
//             return (
//               <Button
//                 variant="ghost"
//                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//               >
//                 Quantity
//                 <ArrowUpDown className="ml-2 h-4 w-4" />
//               </Button>
//             )
//           },
//         },
//         {
//           accessorKey: "updatedAt",
//           header: ({ column }) => {
//             return (
//               <Button
//                 variant="ghost"
//                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//               >
//                 Last Updated
//                 <ArrowUpDown className="ml-2 h-4 w-4" />
//               </Button>
//             )
//           },
//           cell: ({ row }) => {
//             return format(new Date(row.getValue("updatedAt")), "MMM dd, yyyy")
//           },
//         },
//         {
//           id: "actions",
//           cell: ({ row }) => {
//             const medicine = row.original
//             return (
//               <div className="text-right">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button className="h-8 w-8 p-0">
//                       <span className="sr-only">Open menu</span>
//                       <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuItem onClick={() => onView(medicine)}>
//                       View details
//                     </DropdownMenuItem>
//                     <DropdownMenuItem>Edit medicine</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => onUpdateStock(medicine)}>
//                       Update stock
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem
//                       className="text-destructive focus:text-destructive"
//                       onClick={() => onDelete(medicine.id)}
//                       disabled={isDeleting && deletingId === medicine.id}
//                     >
//                       {isDeleting && deletingId === medicine.id ? "Deleting..." : "Delete"}
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             )
//           },
//         },
//       ]
//     },
//     {
//       accessorKey: "category.name",
//       header: "Category",
//     },
//     {
//       accessorKey: "manufacturer.name",
//       header: "Manufacturer",
//     },
//     {
//       accessorKey: "unit.name",
//       header: "Unit",
//     },
//     {
//       accessorKey: "sellPrice",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Price
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },
//       cell: ({ row }) => {
//         const price = parseFloat(row.getValue("sellPrice"))
//         return <div className="text-right">${price.toFixed(2)}</div>
//       },
//     },
//     {
//       accessorKey: "stock.quantity",
//       header: "Stock Status",
//       cell: ({ row }) => {
//         const quantity = row.getValue("stock.quantity") as number
//         return getStockStatus(quantity)
//       },
//     },
//     {
//       accessorKey: "stock.quantity",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Quantity
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },
//     },
//     {
//       accessorKey: "updatedAt",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Last Updated
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },
//       cell: ({ row }) => {
//         return format(new Date(row.getValue("updatedAt")), "MMM dd, yyyy")
//       },
//     },
//     {
//       id: "actions",
//       cell: ({ row }) => {
//         const medicine = row.original
//         return (
//           <div className="text-right">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="h-8 w-8 p-0">
//                   <span className="sr-only">Open menu</span>
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                 <DropdownMenuItem onClick={() => onView(medicine)}>
//                   View details
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>Edit medicine</DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => onUpdateStock(medicine)}>
//                   Update stock
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   className="text-destructive focus:text-destructive"
//                   onClick={() => onDelete(medicine.id)}
//                   disabled={isDeleting && deletingId === medicine.id}
//                 >
//                   {isDeleting && deletingId === medicine.id ? "Deleting..." : "Delete"}
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         )
//       },
//     },
//   ]