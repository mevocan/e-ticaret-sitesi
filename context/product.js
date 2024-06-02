"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Resizer from "react-image-file-resizer";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [comment, setComment] = useState("");
  const [brands, setBrands] = useState([]);

  const uploadImages = (e) => {
    const files = e.target.files;

    let allUploadedFiles = updatingProduct
      ? updatingProduct?.images || []
      : product
      ? product?.images || []
      : [];

    if (files) {
      // check if the total combined images exceed 4

      const totalImages = allUploadedFiles?.length + files?.length;

      if (totalImages > 4) {
        toast.error("You can upload a maximum of 4 images");
        return;
      }
      setUploading(true);

      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const promise = new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1280,
            720,
            "JPEG",
            100,
            0,
            (uri) => {
              fetch(`${process.env.API}/admin/upload/image`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: uri }),
              })
                .then((response) => response.json())
                .then((data) => {
                  allUploadedFiles.unshift(data);
                  resolve();
                })
                .catch((err) => {
                  console.log(err);
                  resolve();
                });
            },
            "base64"
          );
        });
        uploadPromises.push(promise);
      }

      Promise.all(uploadPromises)
        .then(() => {
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                images: allUploadedFiles,
              })
            : setProduct({ ...product, images: allUploadedFiles });
          setUploading(false);
        })
        .catch((err) => {
          console.log(" img upload fail ", err);
          setUploading(false);
        });
    }
  };
  const deleteImage = (public_id) => {
    setUploading(true);
    fetch(`${process.env.API}/admin/upload/image/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredImages = updatingProduct
          ? updatingProduct?.images.filter(
              (image) => image.public_id !== public_id
            )
          : product?.images.filter((image) => image.public_id !== public_id);
        updatingProduct
          ? setUpdatingProduct({ ...updatingProduct, images: filteredImages })
          : setProduct({ ...product, images: filteredImages });
      })
      .catch((err) => {
        console.log(" img delete fail ", err);
      }).finally(() => {
        setUploading(false);
      })
  };
  const createProduct = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success(`Product ${data?.title} created successfully`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchProducts = async (page = 1) => {
    try {
      const response = await fetch(`${process.env.API}/product?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setProducts(data?.products);
        setCurrentPage(data?.currentPage);
        setTotalPages(data?.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBrands = async () => {
    try {
      const response = await fetch(`${process.env.API}/product/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setBrands(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatingProduct?._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatingProduct),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success(`Product ${data?.title} updated successfully`);
        window.location.href = "/dashboard/admin/products";
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatingProduct?._id}`,
        {
          method: "DELETE",
        }
      );
      
      const data = await response.json();
  
      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success(`Product ${data?.title} deleted successfully`);

        console.log(data.public_id);

        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        products,
        setProducts,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        updatingProduct,
        setUpdatingProduct,
        uploading,
        setUploading,
        uploadImages,
        deleteImage,
        createProduct,
        fetchProducts,
        updateProduct,
        deleteProduct,
        showRatingModal,
        setShowRatingModal,
        currentRating,
        setCurrentRating,
        comment,
        setComment,
        fetchBrands,
        brands,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
