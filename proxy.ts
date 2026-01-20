import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const notProtectedPaths = ['/sign-in', '/sign-up', '/forgot', '/reset'];

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isPublicPath = notProtectedPaths.includes(pathname);

	const token = request.cookies.get('accessToken')?.value;

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}

	if (token && notProtectedPaths.includes(pathname)) {

		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
	],
};
