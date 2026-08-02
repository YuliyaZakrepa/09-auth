import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { checkSession } from "@/lib/api/serverApi";
const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        const data = await checkSession();
        const setCookie = data.headers["set-cookie"];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parseSetCookie(cookieStr);

            if (parsed.value) {
              cookieStore.set(parsed.name, parsed.value, parsed);
            }
          }
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

          if (parsed.value) {
            cookieStore.set(parsed.name, parsed.value, parsed);
          }
        }
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    if (isAuthRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}


export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
