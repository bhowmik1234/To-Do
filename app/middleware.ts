import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest, { params }: any) {
    const path = request.nextUrl.pathname;

    const isPublic = path === '/login' || path === '/signup' || path === '/verifyemail' || path == '/';

    // const token = request.cookies.get("token")?.value || '';
    const token = params.userid || '';

    if(isPublic && token)
    {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if(!isPublic && !token)
    {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}
 
// all matching routes
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/:path*',
  ],
}