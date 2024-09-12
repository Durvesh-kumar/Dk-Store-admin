"use client"
import Loader from '@/components/coustem ui/Loading';
import OrderColumes from '@/components/order/OrderColumm';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true)

    try {
        const getOrders = async()=>{
            const res = await fetch("/api/orders", {
                method: "GET"
            });

            if(res.ok){
                const data = await res.json();
                setLoading(false)
                console.log(data);
                
                setOrders(data)
            }
        }

        useEffect(()=>{
            getOrders()
        },[])
    } catch (error) {
        console.log('[Order_Get]', error);
        toast.error("Somting went wrong! Please try again")
    }
  return loading ? <Loader/> : (
    <div className='grid gap-5'>
        <p className='text-3xl font-bold text-gray-950'>Orders</p>
        <hr className='p-0.5 bg-gray-900 shadow-md my-5'/>

        <Input type='text' placeholder='Search...' className='w-1/3'/>

        <OrderColumes data={orders}/>
    </div>
  )
}

export default Orders