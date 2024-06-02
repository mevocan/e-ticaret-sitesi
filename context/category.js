"use client";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useTag } from "./tag";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [name, setName] = useState("");

  const [categories, setCategories] = useState([]);

  const [updatingCategory, setUpdatingCategory] = useState(null);

  const { tags, setTags } = useTag();

  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Category created successfully");
        setName("");
        setCategories([data, ...categories]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category");
    }
  };
  const fechtCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        toast.error(data);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch category");
    }
  };
  const fechtCategoriesPublic = async () => {
    try {
      const response = await fetch(`${process.env.API}/categories`);
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        toast.error(data);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch category");
    }
  };
  const updateCategory = async () => {
    const response = await fetch(
      `${process.env.API}/admin/category/${updatingCategory?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatingCategory),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      toast.error(data);
    } else {
      toast.success("Category updated successfully");
      setUpdatingCategory(null);
      setCategories(
        categories.map((category) =>
          category._id === data._id ? data : category
        )
      );
    }

    try {
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  };
  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success("Category deleted successfully");
        setUpdatingCategory(null);

        const deletedCategoryTags = tags.filter(
          (tag) => tag.parentCategory === updatingCategory._id
        );
        deletedCategoryTags.forEach(async (tag) => {
          try {
            const tagResponse = await fetch(
              `${process.env.API}/admin/tag/${tag._id}`,
              {
                method: "DELETE",
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const tagData = await tagResponse.json();
            if (!tagResponse.ok) {
              toast.error(tagData.err);
            } else {
              // Silinen etiketi etiketler listesinden kaldır
              setTags((prevTags) =>
                prevTags.filter((prevTag) => prevTag._id !== tag._id)
              );
              
            }
            
          } catch (error) {
            console.error(error);
            toast.error("Failed to delete tag");
          }
        });
        toast.success("Tags deleted successfully");
        setCategories(
          categories.filter((category) => category._id !== data._id)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        categories,
        setCategories,
        updatingCategory,
        setUpdatingCategory,
        createCategory,
        fechtCategory,
        fechtCategoriesPublic,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
