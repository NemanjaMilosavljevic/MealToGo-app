export function middleware(request) {
  const currentUser = request.cookies.get("next-auth.session-token")?.value;
  console.log("middleware");

  if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", request.url));
  }

  if (
    (!currentUser && request.nextUrl.pathname.startsWith("/favorites")) ||
    request.nextUrl.pathname.startsWith("/order")
  ) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
