import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

function ShimmerList() {
  return (
    <>
       <TableRow>
          <TableCell><Skeleton className='h-4 w-full'/></TableCell>
          <TableCell><Skeleton className='h-4 w-full'/></TableCell>
          <TableCell><Skeleton className='h-4 w-full'/></TableCell>
          <TableCell><Skeleton className='h-4 w-full'/></TableCell>
          <TableCell><Skeleton className='h-4 w-full'/></TableCell>
       </TableRow>
        <TableRow>
        <TableCell><Skeleton className='h-4 w-full'/></TableCell>
        <TableCell><Skeleton className='h-4 w-full'/></TableCell>
        <TableCell><Skeleton className='h-4 w-full'/></TableCell>
        <TableCell><Skeleton className='h-4 w-full'/></TableCell>
        <TableCell><Skeleton className='h-4 w-full'/></TableCell>
     </TableRow>
     </>
  );
}

export default ShimmerList;
