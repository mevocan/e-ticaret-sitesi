import React from 'react'
import { BsStar,BsStarFill ,BsStarHalf  } from "react-icons/bs";

export default function Stars({rating}) {
    const stars =[]
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<BsStarFill key={i} className="text-yellow-500" />)
        }else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<BsStarHalf key={i} className="text-yellow-500" />)
        }
         else {
            stars.push(<BsStar key={i} className="text-yellow-500" />)
        }
    }
  
  return (
    <div className='flex text-2xl gap-1'>
        {stars}
    </div>
  )
}
