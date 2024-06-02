"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategory } from "@/context/category";
import React from "react";

export default function CategoryCreate() {
  const {
    name,
    setName,
    updatingCategory,
    setUpdatingCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  return (
    <div className="bg-white  p-4 rounded-md shadow-md mb-4">
      <h2 className=" text-2xl font-semibold  text-gray-700 mb-4">
        {updatingCategory ? "Update" : "Create"} Category
      </h2>
      <div className="lg:flex gap-3 items-end">
        <Input
          type="text"
          value={updatingCategory ? updatingCategory?.name : name}
          onChange={(e) =>
            updatingCategory
              ? setUpdatingCategory({
                  ...updatingCategory,
                  name: e.target.value,
                })
              : setName(e.target.value)
          }
        ></Input>
        <div className="flex gap-3 mt-2 ">
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            updatingCategory ? updateCategory() : createCategory();
          }}
        >
          {updatingCategory ? "Update" : "Create"}
        </Button>
        {updatingCategory && (
          <>
          <Button
          className="bg-red-500 hover:bg-red-600"
            onClick={(e) => {
              e.preventDefault();
              deleteCategory();
            }}
          >
            Delete
          </Button>
          <Button
          className="bg-gray-500 hover:bg-gray-600"
            onClick={(e) => {
              e.preventDefault();
              setUpdatingCategory(null);
            }}
          >
            Cancel
          </Button>
          </>
        )}</div>
      </div>
    </div>
  );
}
