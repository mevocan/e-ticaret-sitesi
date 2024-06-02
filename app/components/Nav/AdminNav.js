"use client";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { CgProductHunt } from "react-icons/cg";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false); // Sayfa değiştiğinde sidebar'ı kapat
  }, [pathname]);

  return (
    <div className="relative flex top-0 left-0 h-screen z-10">
      <div
        className={`flex h-screen top-0 fixed bg-gray-200 dark:bg-gray-900 transform transition-all duration-300 ${
          isOpen ? "ml-0" : "-ml-64"
        }`}
      >
        <aside className="w-64 -top-14 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-700">
          <div className="h-16 flex items-center justify-center border-b-2">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Admin Panel
            </h2>
          </div>
          <ul>
            <Link
              className="flex items-center space-x-4 p-6 hover:bg-gray-100 dark:hover:bg-gray-700"
              href="/dashboard/admin"
            >
              <IoHomeOutline className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link
              className="flex items-center space-x-4 p-6 hover:bg-gray-100 dark:hover:bg-gray-700"
              href="/dashboard/admin/products"
            >
              <CgProductHunt className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">List of Product</span>
            </Link>
            <Link
              className="flex items-center space-x-4 p-6 hover:bg-gray-100 dark:hover:bg-gray-700"
              href="/dashboard/admin/product"
            >
              <CgProductHunt className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Create Product</span>
            </Link>
            <Link
              className="flex items-center space-x-4 p-6 hover:bg-gray-100 dark:hover:bg-gray-700"
              href="/dashboard/admin/category"
            >
              <BiCategory className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Category</span>
            </Link>
            <Link
              className="flex items-center space-x-4 p-6 hover:bg-gray-100 dark:hover:bg-gray-700"
              href="/dashboard/admin/tag"
            >
              <FaTags className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Tag</span>
            </Link>

            <Link
              className="flex items-center space-x-4 p-6 hover:bg-gray-100 dark:hover:bg-gray-700"
              href="/dashboard/admin/settings"
            >
              <CiSettings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </ul>
        </aside>
      </div>
      <div
        className={`fixed top-1/2  z-20 transition-all duration-300 ${
          isOpen ? "ml-64" : "0"
        }`}
      >
        <Button
          onClick={toggleSidebar}
          variant="outline"
          className="rounded-full w-10 h-10 p-0"
        >
          {isOpen ? (
            <FaArrowLeft className="text-2xl" />
          ) : (
            <FaArrowRight className="text-2xl" />
          )}
        </Button>
      </div>
    </div>
  );
}
