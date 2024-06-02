"use client";
import * as React from "react";
import { useTag } from "@/context/tag";
import { useEffect } from "react";
import { useCategory } from "@/context/category";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function TagCreate() {
  const {
    createTag,
    updateTag,
    deleteTag,
    name,
    setName,
    parentCategory,
    setParentCategory,
    updatingTag,
    setUpdatingTag,
  } = useTag();

  const { fechtCategory, categories } = useCategory();
  
  useEffect(() => {
    fechtCategory();
  }, []);

  return (
    <div className="bg-white  p-4 rounded-md shadow-md mb-4">
      <h1 className="text-2xl font-semibold">Create Tag</h1>
      <div className="lg:flex gap-3 justify-center items-end">
        <Input
          type="text"
          value={updatingTag ? updatingTag?.name : name}
          onChange={(e) => {
            updatingTag
              ? setUpdatingTag({ ...updatingTag, name: e.target.value })
              : setName(e.target.value);
          }}
          placeholder="Tag name"
          className=""
        />
        <div className="md:flex gap-3 items-end">
          <div className="flex items-end gap-3 mt-2">
            <select
              name="category"
              className="w-[180px] border border-gray-300 rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={(e) =>
                updatingTag
                  ? setUpdatingTag({
                      ...updatingTag,
                      parentCategory: e.target.value,
                    })
                  : setParentCategory(e.target.value)
              }
            >
              <option className="" value="" disabled selected>
                Select a category
              </option>
              {categories?.map((c) => (
                <option
                  className="hover:cursor-pointer"
                  key={c._id}
                  value={c._id}
                  selected={
                    c?._id === updatingTag?.parentCategory ||
                    c?._id === parentCategory
                  }
                >
                  {c.name}
                </option>
              ))}
            </select>

            {/* <Select
            name="category"
            onChange={(e) =>
              updatingTag
                ? setUpdatingTag({
                    ...updatingTag,
                    parentCategory: e.target.value,
                  })
                : setParentCategory(e.target.value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tags</SelectLabel>
                {categories.map((c) => (
                  <SelectItem
                    key={c._id}
                    value={c._id}
                    className="hover:cursor-pointer"
                    selected={
                      c._id === updatingTag?.parentCategory ||
                      c._id === parentCategory
                    }
                  >
                    {c.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}

            <Button
              className=" mt-4"
              onClick={() => {
                updatingTag ? updateTag() : createTag();
              }}
            >
              {updatingTag ? "Update" : "Create"} Tag
            </Button>
          </div>

          <div className="flex gap-3">
            {updatingTag && (
              <>
                {" "}
                <Button
                  className=" mt-4 bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    deleteTag();
                  }}
                >
                  Delete Tag
                </Button>
                <Button
                  className=" mt-4 bg-gray-500 hover:bg-gray-600"
                  onClick={() => {
                    setUpdatingTag(null);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


