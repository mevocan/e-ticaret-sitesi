'use client';
import { Button } from '@/components/ui/button'
import { useCategory } from '@/context/category'
import { useEffect } from 'react';

export default function CategoryList() {

  const { fechtCategory ,categories , setUpdatingCategory} = useCategory()

  useEffect(() => {
    fechtCategory()
  } ,[])

  return (
    <div className='  bg-white p-4 rounded-md shadow-md  mb-4'>
      <h2 className=' text-2xl font-semibold text-gray-700  mb-4  '>
        Category List
      </h2>
      {categories.map((c) => (
        <div key={c._id} className='flex justify-between items-center  border-b-2 border-gray-100 py-2'>
          <p className='text-lg font-semibold text-gray-700'>{c.name}</p>
          <Button onClick={() => setUpdatingCategory(c)}>Edit</Button>

        </div>
      ))}
    </div>
  )
}
