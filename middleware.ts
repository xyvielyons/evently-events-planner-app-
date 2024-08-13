import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher(['/','/events/:id','/api/webhook/clerk','/api/webhook/stripe','/api/uploadthing'])
const ignoredRoutes = createRouteMatcher(['/api/webhook/stripe','/api/uploadthing'])


export default clerkMiddleware((auth,request)=>{


});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};