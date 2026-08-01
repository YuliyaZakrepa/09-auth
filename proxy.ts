import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { api } from "@/app/api/api";
const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy (request:NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (accessToken === undefined) {
    if (refreshToken !== undefined) {
      const { headers } = await api.get("/auth/session", {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const setCookie = headers["set-cookie"];

      if (setCookie !== undefined) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieString of cookieArray) {
          const parsed = parseSetCookie(cookieString);

          const options = {
            expires: parsed.expires ? new Date(parsed.expires) : undefined,
            path: parsed.path,
            maxAge: Number(parsed.maxAge),
          };

          if (parsed.name === "accessToken" && parsed.value !== undefined) {
            cookieStore.set("accessToken", parsed.value, options);
          }

          if (parsed.name === "refreshToken" && parsed.value !== undefined) {
            cookieStore.set("refreshToken", parsed.value, options);
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
  } else {
    if (isPrivateRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
