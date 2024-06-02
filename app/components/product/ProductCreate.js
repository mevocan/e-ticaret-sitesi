"use client";
import { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProductCreate() {
  const {
    product,
    setProduct,
    updatingProduct,
    setUpdatingProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploading,
    setUploading,
    uploadImages,
    deleteImage,
  } = useProduct();

  const { categories, fechtCategory } = useCategory();

  const { tags, fetchTag } = useTag();

  const imagesPrewiew = updatingProduct
    ? updatingProduct?.images ?? []
    : product?.images ?? [];

  useEffect(() => {
    fechtCategory();
    fetchTag();
  }, []);

  return (
    <div className="my-5">
      <p className="text-2xl font-bold text-gray-800 mb-4">
        {updatingProduct ? "Updating Product" : "Creating Product"}
      </p>
      <Input
        type="text"
        placeholder="Title"
        value={updatingProduct ? updatingProduct?.title : product?.title}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, title: e.target.value })
            : setProduct({ ...product, title: e.target.value })
        }
      />
      <Textarea
        placeholder="Type your description here."
        className="mt-4"
        value={
          updatingProduct ? updatingProduct?.description : product?.description
        }
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                description: e.target.value,
              })
            : setProduct({ ...product, description: e.target.value })
        }
      />
      <Input
        type="number"
        placeholder="Price"
        min="1"
        className="mt-4"
        value={updatingProduct ? updatingProduct?.price : product?.price}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, price: e.target.value })
            : setProduct({ ...product, price: e.target.value })
        }
      />

      <Input
        type="text"
        placeholder="Color"
        className="mt-4"
        value={updatingProduct ? updatingProduct?.color : product?.color}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, color: e.target.value })
            : setProduct({ ...product, color: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Brand"
        className="mt-4"
        value={updatingProduct ? updatingProduct?.brand : product?.brand}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, brand: e.target.value })
            : setProduct({ ...product, brand: e.target.value })
        }
      />
      <Input
        type="number"
        placeholder="Stock"
        min="1"
        className="mt-4"
        value={updatingProduct ? updatingProduct?.stock : product?.stock}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, stock: e.target.value })
            : setProduct({ ...product, stock: e.target.value })
        }
      />
      <select
        name="category"
        className="w-[180px] my-3 border border-gray-300 rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        onChange={(e) => {
          const categoryId = e.target.value;
          const categoryName =
            e.target.options[e.target.selectedIndex].getAttribute("name");

          const category = categoryId
            ? { _id: categoryId, name: categoryName }
            : null;
          if (updatingProduct) {
            setUpdatingProduct({
              ...updatingProduct,
              category,
            });
          } else {
            setProduct({ ...product, category });
          }
        }}
        value={
          updatingProduct
            ? updatingProduct?.category?._id
            : product?.category?._id
        }
      >
        <option>Select a category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id} name={c?.name}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap">
        {tags
          ?.filter(
            (ft) =>
              ft?.parentCategory ===
              (updatingProduct?.category?._id || product?.category?._id)
          )
          ?.map((tag) => (
            <div
              className="flex items-center space-x-2 my-3 me-3"
              key={tag._id}
            >
              <input
                type="checkbox"
                className=""
                value={tag?._id}
                id="tags"
                onChange={(e) => {
                  const tagId = e.target.value;
                  const tagName = tag?.name;
                  let selectedTags = updatingProduct
                    ? [...(updatingProduct?.tags ?? [])]
                    : [...(product?.tags ?? [])];

                  if (e.target.checked) {
                    selectedTags.push({ _id: tagId, name: tagName });
                  } else {
                    selectedTags = selectedTags.filter((t) => t._id !== tagId);
                  }

                  if (updatingProduct) {
                    setUpdatingProduct({
                      ...updatingProduct,
                      tags: selectedTags,
                    });
                  } else {
                    setProduct({ ...product, tags: selectedTags });
                  }
                }}
              />
              <label
                htmlFor="tags"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {tag.name}
              </label>
            </div>
          ))}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor="picture">
          {uploading ? "Yükleniyor" : "Foto Yükle"}
          <Input
            id="picture"
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={uploadImages}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="flex mt-3 gap-6">
        {imagesPrewiew?.map((img) => (
          <div key={img?.public_id} className="relative w-32 h-32  ">
            <Image
              className="rounded-md"
              src={img?.secure_url}
              alt="product image"
              layout="fill"
              objectFit="cover"
            />
            <button
              className="bg-red-500 text-white rounded-full w-6 h-6 absolute top-1 right-1"
              onClick={() => deleteImage(img?.public_id)}
            >
              x
            </button>
          </div>
        ))}
      </div>

      <div className="
        flex
        mt-4
        gap-4
      ">
        <Button 
          className="mt-4 bg-green-500 hover:bg-green-600"
          onClick={() =>
           ( updatingProduct ? updateProduct() : createProduct() )
          }
        >
          {updatingProduct ? "Update" : "Create"}
        </Button>

        {updatingProduct && (
          <>
          <Button
            className="mt-4 bg-red-500 hover:bg-red-600"
            onClick={() => (
              imagesPrewiew.map((img) => deleteImage(img?.public_id)),
              deleteProduct())}
          >
            Delete
          </Button>
            <Button 
              className="mt-4 bg-gray-500 hover:bg-gray-600"
              onClick={() => window.location.reload()}
            >
              Cancel
            </Button>
          </>
        )}
      </div>

      {/* <pre>
        <code>{JSON.stringify(product, null, 2)}</code>
      </pre> */}
    </div>
  );
}
