'use client'
import React, { useEffect, useState } from 'react'
import { calculateAverageRating } from "@/utils/helpers";
import Stars from './Stars';

export default function ProductStar({product}) {

    const [productRatings, setProductRatings] = useState(product?.ratings || []);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        if(productRatings){
          const average = calculateAverageRating(productRatings);
          
          setAverageRating(average);
        }
        
      }, [product[0]?.ratings]);

  return (
    <div className='flex'>
        <Stars rating={averageRating}/> 
    </div>
  )
}
