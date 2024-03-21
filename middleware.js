import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const currentUser = req.cookies.get("next-auth.session-token")?.value;

  const role = (await getToken({ req }))?.name;

  if (
    currentUser &&
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname === "/admin")
  ) {
    return Response.redirect(new URL("/", req.url), 302);
  }

  if (
    !currentUser &&
    (req.nextUrl.pathname.startsWith("/favorites") ||
      req.nextUrl.pathname.startsWith("/order"))
  ) {
    return Response.redirect(new URL("/login", req.url), 302);
  }

  if (!role && req.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/", req.url), 302);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
