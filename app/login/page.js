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
import {  useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn  } from "next-auth/react";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searhParams = useSearchParams();
  const callbackUrl = searhParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error(result?.error);
        setLoading(false);
      } else {
        toast.success("Giriş başarılı");
        setLoading(false);
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
    return (
      <div className="relative flex flex-col justify-center items-center  overflow-hidden m-4">
        <div className="w-full m-auto bg-white lg:max-w-lg">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Giriş Yap</CardTitle>
              <CardDescription className="text-center">
                İsim, email ve şifre ile giriş yapın
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    required
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                  />
                </div>
                <span className=" text-blue-600 hover:underline text-sm">
                  Şifrenizi mi unuttunuz?
                </span>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  className="w-full"
                  type="submit"
                  disabled={loading || !email || password.length < 6}
                >
                  {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </CardFooter>
            </form>
            <div className="relative mb-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  YA DA HEMEN GİRİŞ YAP
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 m-2">
              <Button
                variant="outline"
                onClick={() => signIn("google", { callbackUrl })}
              >
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
              Bir Hesabınız Yok Mu?{" "}
              <Link href="/register" className=" text-blue-600 hover:underline">
                Hemen Üye Ol
              </Link>
            </p>
          </Card>
        </div>
      </div>
    );
  
}
