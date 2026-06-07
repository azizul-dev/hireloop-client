import { NextResponse } from "next/server";

function cleanCookies(cookieString) {
  if (!cookieString) return "";
  return cookieString
    .split(";")
    .map((c) => c.trim())
    .filter(
      (c) =>
        !c.startsWith("better-auth.session_data=") &&
        !c.startsWith("__Secure-better-auth.session_data=")
    )
    .join("; ");
}

export function proxy(request) {
  const cookieHeader = request.headers.get("cookie");

  if (
    cookieHeader &&
    (cookieHeader.includes("better-auth.session_data") ||
      cookieHeader.includes("__Secure-better-auth.session_data"))
  ) {
    const cleanCookie = cleanCookies(cookieHeader);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("cookie", cleanCookie);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Request the browser to delete the problematic cookie
    response.cookies.delete("better-auth.session_data");
    response.cookies.delete("__Secure-better-auth.session_data");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
