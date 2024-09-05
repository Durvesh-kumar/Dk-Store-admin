'use client'
import CollectionColumes from '@/components/collection/CollectionColumes'
import Loader from '@/components/coustem ui/Loading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Collection = () => {
  const router = useRouter()
  const [collectionData, setCollectionData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async ()=>{
    try {

      const res = await fetch('/api/collections', {
        method: "GET"
      })
        const data = await res.json()
        setCollectionData(data)
        setLoading(false)
    } catch (error) {
      console.log('[Collection_GET]', error);
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  
  return loading ? <Loader/>: (
    <>
    <h1 className='flex items-center text-gray-950 justify-center text-3xl font-bold my-5'>Collections List</h1>
    <div className='flex items-center justify-end'>
      <Button size='lg' onClick={()=> {router.push('/collections/new')}} className='text-white bg-blue-600 border hover:bg-white hover:text-black gap-2 flex-nowrap text-xl' ><Plus/> Create Collection</Button>
    </div>
    <hr className='bg-gray-950 h-1 shadow-lg my-5' />
      <CollectionColumes data ={collectionData}/>
    </>
    
  )
}

export default Collection