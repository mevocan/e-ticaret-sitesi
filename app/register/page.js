"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dddd = process.env.API;
  console.log(dddd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error); 
        } else {
          toast.success("Hesabınız başarıyla oluşturuldu");
          router.push("/login");
        }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center  overflow-hidden m-8">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Bir hesap oluştur
            </CardTitle>
            <CardDescription className="text-center">
              İsim, email ve şifre girerek hemen üye olun
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">İsim</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  value={password}
                  placeholder="En az 6 karakterli bir şifre girin"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full"
                type="submit"
                disabled={loading || !name || !email || password.length < 6}
              >
                {loading ? "Üye olunuyor..." : "Üye Ol"}
              </Button>
            </CardFooter>
          </form>
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                YA DA HEMEN ÜYE OL
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 m-2">
            <Button variant="outline">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline">
              <FaFacebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
          <p className="mt-2 text-xs text-center text-gray-700 mb-2">
            {" "}
            Zaten bir hesabınız var mı?{" "}
            <Link href="/login" className=" text-blue-600 hover:underline">
              Giriş Yap
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
