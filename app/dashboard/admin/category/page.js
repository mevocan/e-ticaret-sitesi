import CategoryCreate from '@/app/components/category/CategoryCreate'
import CategoryList from '@/app/components/category/CategoryList'
import React from 'react'

export default function AdminCategoryPage() {
  return (
    <div className='container'>
      <CategoryCreate />
      <CategoryList />
    </div>
  )
}
