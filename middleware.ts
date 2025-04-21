import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    const subdomain = hostname.split('.')[0]

    const pathname = request.nextUrl.pathname

    // Skip static files and Next.js internals
    const STATIC_FILE = pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/Images') ||
        pathname.startsWith('/robots.txt') ||
        pathname.includes('.')

    if (STATIC_FILE) return NextResponse.next()

    if (subdomain === 'jump') {
        const url = request.nextUrl.clone()
        url.pathname = `/jump${url.pathname}`
        return NextResponse.rewrite(url)
    }

    return NextResponse.next()
}
