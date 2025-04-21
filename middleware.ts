import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    const subdomain = hostname.split('.')[0]

    if (subdomain === 'jump') {
        const url = request.nextUrl.clone()
        url.pathname = `/jump${url.pathname}`
        return NextResponse.rewrite(url)
    }

    return NextResponse.next()
}
