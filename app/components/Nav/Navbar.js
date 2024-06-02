import { Input } from "@/components/ui/input";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <div className="p-4 flex justify-between items-center container">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="logo"
          priority={true}
        />
        <p className="text-2xl font-bold hidden sm:block">Dadaylı</p>
      </Link>
      <div className="flex w-[465px]">
        <Input
          className="focus-visible:ring-0 rounded-s-full border-e-0"
          placeholder="Aradığınız ürünü bulun"
        />
        <Button className="rounded-s-none">Ara</Button>
      </div>
      <div className="hidden lg:flex justify-end w-80">
      {status === "authenticated" ? (
        <div>
          <Link
            href={`/dashboard/${session?.user?.role === "admin" ? "admin" : "user"}`}
            className={buttonVariants({ variant: "outline" })}
          >
            {session.user.name}
          </Link>
          <Button onClick={() => signOut()} className="ms-2">
            Çıkış Yap
          </Button>
        </div>
      ) : status === "loading" ? (
        <Button className="flex items-center">
          <div
            role="status"
            className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          Loading
        </Button>
      ) : (
        <Link className={buttonVariants({ variant: "outline" })} href="/login">
          Giriş Yap
        </Link>
      )}</div>
    </div>
  );
}
