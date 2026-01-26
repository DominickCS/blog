import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import FetchUserDetails from './app/_serverActions/(auth)/fetchUserDetails'

export async function proxy(request: NextRequest) {
  const userAuthorization = await FetchUserDetails()

  if (userAuthorization?.isError) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/profile/:path*', '/create-post/:path*']
}
