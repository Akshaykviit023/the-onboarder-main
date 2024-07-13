import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    '/chat(.*)',
]);

const isProtectedRoute2 = createRouteMatcher([
    '/',
]);

export default clerkMiddleware((auth, req) => {
    if(!auth().userId && isProtectedRoute(req)){
        return auth().redirectToSignIn();
    }

    if(auth().userId && isProtectedRoute2(req)){
        let path = '/chat'
        return NextResponse.redirect(new URL(path, req.url));
    }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};