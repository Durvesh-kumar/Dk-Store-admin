"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItemPropes {
  data: any;
}

const OrderItemColums: React.FC<OrderItemPropes> = ({ data }) => {
  console.log(data.map((item: OrderItemType) => item.color));

  return (
    <Table className=" border-2 shadow-xl rounded">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo.</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: OrderItemType, index:number) => (
          <TableRow key={index}>
            <TableCell>{index+1}.</TableCell>
            <TableCell>{item?.product?.title }</TableCell>
            <TableCell>{item?.size}</TableCell>
            <TableCell>{item?.color}</TableCell>
            <TableCell>{item?.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderItemColums;
