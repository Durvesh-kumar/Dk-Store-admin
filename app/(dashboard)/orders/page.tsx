"use client"
import React, { useEffect, useState } from 'react'

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

        // console.log(orders);
    } catch (error) {
        console.log('Somting went wrong! Please try again');
    }
  return (
    <div>Order</div>
  )
}

export default Orders