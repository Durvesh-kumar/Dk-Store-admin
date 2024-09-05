"use client"
import Loader from "@/components/coustem ui/Loading";
import ProductColumes from "@/components/product/ProductColumes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Product = () => {
  const router = useRouter()
  const [productData, setProductData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setProductData(data);
        setLoading(false);
      }
    } catch (error) {
      console.log("[Product_GET", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return loading ? <Loader/> : (
    <>
    <h1 className='flex items-center text-gray-950 justify-center text-3xl font-bold my-5'>Product List</h1>
    <div className='flex items-center justify-end'>
      <Button size='lg' onClick={()=> {router.push('/products/new')}} className='text-white bg-blue-600 border hover:bg-white hover:text-black gap-2 flex-nowrap text-xl' ><Plus/> Create Product</Button>
    </div>
    <hr className='bg-gray-950 h-1 shadow-lg my-10' />
  <ProductColumes data={productData} />
  </>
  )
};

export default Product;
