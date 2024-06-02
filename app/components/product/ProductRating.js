"use client";
import { useEffect, useState } from "react";
import Stars from "./Stars";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useProduct } from "@/context/product";
import { calculateAverageRating } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import  toast  from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

export default function ProductRating({product}) {
  
  const {
    showRatingModal,
    setShowRatingModal,
    currentRating,
    setCurrentRating,
    comment,
    setComment,
  } = useProduct();
  const [productRatings, setProductRatings] = useState(product[0]?.ratings || []);


  const [averageRating, setAverageRating] = useState(0);

  const { data: session ,status } = useSession();
  
  const router = useRouter();
  const pathname = usePathname();

  const alreadyRated = productRatings.find((rate)=>
  rate?.postedBy?._id === session?.user?._id
  )

  useEffect(() => {
    if(alreadyRated){
      setCurrentRating(alreadyRated?.rating)
      setComment(alreadyRated.comment)
    }else{
      setCurrentRating(0)
      setComment("")
    }

  }, [alreadyRated]);

  useEffect(() => {
    if(productRatings){
      const average = calculateAverageRating(productRatings);
      
      setAverageRating(average);
    }
    
  }, [product[0]?.ratings]);

  const submitRating = async () => {
    if(status !== "authenticated"){
      toast.error("You need to be logged in to submit a rating")
      router.push(`/login?callbackUrl=${pathname}`)
      return
    }
    try {
        const response = await fetch(`${process.env.API}/user/product/rating`, {
        method: "POST",
        body: JSON.stringify({
          productId: product[0]?._id,
          rating: currentRating,
          comment
        })
      });
      
      if(!response.ok){
        throw new Error('ERror')
      }
      
      const data = await response.json();
      setProductRatings(data?.ratings)
      setShowRatingModal(false)
      toast.success("Rating submitted successfully")
      router.refresh()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again")
    }
  }
  return (
    <div>
      <div className="flex items-center mb-4">
      <Stars rating={averageRating} />
      <p className="text-xl ms-2">
        ({productRatings.length})</p>
        </div>
      
      {!session && (
        <p className="text-red-500">You need to be logged in to submit a rating</p>
      
      )}
      {session && (
        <div className="">
        <Textarea type="text" 
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        placeholder="Add a comment"
        className="form-control"
        />
        <div className="flex text-xl my-3">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <span key={ratingValue} className={ratingValue <= currentRating ? "text-yellow-500 hover:cursor-pointer " : " text-gray-300 cursor-pointer"} 
                onClick={() => setCurrentRating(ratingValue)}
              >
                {ratingValue <= currentRating ? <BsStarFill/> : <BsStar/>}
              </span>
            );
          })}
        </div>
        <Button
          onClick={submitRating}
          className="btn btn-secondary">
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
