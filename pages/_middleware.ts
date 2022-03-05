import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  // This route can only be used once for the super admin
  // to register for the first time.
  if (url.pathname === '/register-79f0bc07b14f') {
    try {
      const HostUrl =
        process.env.NODE_ENV === 'production'
          ? url.host
          : 'http://127.0.0.1:5000';

      const res = await fetch(`${HostUrl}/api/staff-account-check`, {
        headers: new Headers({
          'content-type': 'application/json',
          'x-client-mode': 'admin'
        })
      });

      const { pass_check }: { pass_check: boolean } = await res.json();

      console.log(`pass_check`, pass_check);

      if (!pass_check) {
        return NextResponse.redirect('/login');
      }
    } catch (error) {
      console.log(`error`, error);
      return NextResponse.redirect('/login');
    }
  }

  return NextResponse.next();
}
