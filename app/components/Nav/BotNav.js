'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { CiUser } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

export default function  BotNav() {
    const { data } = useSession();
    const pathname = usePathname()
  return (
    <nav className='fixed bottom-0 left-0 w-full flex justify-around items-center py-4 shadow lg:hidden border-t bg-[#ffffff]'>
        <Link href='/' className={`${pathname=== '/' ? 'border rounded-full p-3 text-red-500':'p-3'}`}>
            <CiHome className='text-3xl ' />
        </Link>
        <Link href='/dashboard/cart' className={`${pathname=== '/dashboard/cart' ? 'border rounded-full p-3 text-red-500':'p-3'}`}>
            <CiShoppingBasket className='text-3xl ' />
        </Link>
        <Link href='/dashboard/favorites' className={`${pathname=== '/dashboard/favorites' ? 'border rounded-full p-3 text-red-500':'p-3'}`}>
            <CiHeart className='text-3xl' />
        </Link>
        <Link href={`/dashboard/${data?.user?.role === "admin" ? "admin" : "user"}`} className={`${(pathname=== '/dashboard/user' || pathname=== '/dashboard/admin' || pathname==='/login') ? 'border rounded-full p-3 text-red-500':'p-3'}`}>
            <CiUser className='text-3xl' />
        </Link>
        
    </nav>
  )
}
