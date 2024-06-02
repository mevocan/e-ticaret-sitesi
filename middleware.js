// export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const token = getToken({req})
    const isAuthenticated = !!token;
    const userRole = req?.nextauth?.token?.user?.role;
    
    if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (url?.includes("/user") && userRole !== "user") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        } 
      },
    },
  }
);
