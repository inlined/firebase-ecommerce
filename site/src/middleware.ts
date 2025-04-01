import { composeMiddleware } from "@/lib/auth-middleware";
import { NextResponse } from "next/server";

export const middleware = composeMiddleware({
    // Allow local building without env set
    options: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG) : {},
}, (request, user) => {
    console.log({ user });
    if (request.nextUrl.pathname === '/') return;
    if (user) return;
    if (request.nextUrl.pathname == '/unauthorized') return;
    return NextResponse.rewrite(new URL('/unauthorized', request.url), { status: 401 });
});

export const config = {
    matcher: [
        '/__cookies__',
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|firebase|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}