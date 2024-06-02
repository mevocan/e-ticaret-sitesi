"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import ImageViewer from 'react-simple-image-viewer';


export default function ProductImage({ product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  // const showImage = (src,title,index) => {
  //   return (
        
  //   );
  // }

  return (
    <div className="h-[460px] overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 flex">
      <Carousel>
       {product[0]?.images.map((image,index) => (
         <Image
         key={index}
          src={image.secure_url}
          alt={product[0]?.title}
          fill
          objectFit="cover"
          onClick={ () => openImageViewer(index) }
          className="object-cover"
        />
        ))}</Carousel>
         {isViewerOpen && (
        <ImageViewer
          src={ product[0]?.images.map((image) => image.secure_url) }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
          }
          }
        />
      )}
    </div>
  );
}
