"use client";
import { useEffect, useState } from "react";
import { useTag } from "@/context/tag";
import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/category";

export default function TagList() {
  const { tags, fetchTag, setUpdatingTag, parentCategory, setParentCategory } =
    useTag();
  const { fechtCategory, categories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState(""); // 1. Seçilen kategoriyi saklayın

  useEffect(() => {
    fetchTag();
    fechtCategory();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value === "all" ? "" : value); // "Hepsi" seçeneği seçildiğinde filtreleme kaldırılır
  };

  const sortedTags = tags
    .filter(
      (tag) =>
        selectedCategory === "" || tag.parentCategory === selectedCategory
    )
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });

  // Etiketleri kategori baş harfine göre gruplama ve alfabetik sıralama
  const groupedTags = {};
  sortedTags.forEach((tag) => {
    const initial = tag.name.charAt(0).toUpperCase();
    if (!groupedTags[initial]) {
      groupedTags[initial] = [];
    }
    groupedTags[initial].push(tag);
  });

  return (
    <div className="  bg-white p-4 rounded-md shadow-md  mb-4">
      <div className="flex items-start justify-between">
        <h2 className=" text-2xl font-semibold text-gray-700  mb-4  ">
          Tag List
        </h2>
        <select
          name="category"
          id=""
          className="w-[180px] border border-gray-300 rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          onChange={(e) => handleCategoryChange(e)}
        >
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(groupedTags).map((initial) => (
        <div key={initial} className="">
          <h3 className="
          text-lg font-semibold text-gray-700  mt-4 
          ">{initial}</h3>
          <div className="flex flex-wrap gap-3  border-b-2 border-gray-100 ">
          {groupedTags[initial].map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center py-2"
            >
              <Button variant='outline' className=" items-center gap-3" onClick={() => setUpdatingTag(t)}>
                <p className="text-lg font-semibold text-gray-700">{t.name} </p>
                {/* <p className="text-sm text-gray-500 ">
                  (
                  {categories.map((c) => {
                    if (c._id === t.parentCategory) {
                      return c.name;
                    }
                  })}
                  ){" "}
                </p> */}
              </Button>
            </div>
          ))}</div>
        </div>
      ))}
    </div>
  );
}
