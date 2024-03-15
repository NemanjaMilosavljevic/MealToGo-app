import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const currentUser = req.cookies.get("next-auth.session-token")?.value;

  const userEmail = (await getToken({ req }))?.email;
  const isAdmin = userEmail?.includes("@admin");

  if (currentUser && req.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", req.url), 302);
  }

  if (
    !currentUser &&
    (req.nextUrl.pathname.startsWith("/favorites") ||
      req.nextUrl.pathname.startsWith("/order"))
  ) {
    return Response.redirect(new URL("/login", req.url), 302);
  }

  if (!isAdmin && req.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/", req.url), 302);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
