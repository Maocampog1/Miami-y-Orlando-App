import { NextResponse } from "next/server";
import { SESSION_SECRET } from "./lib/auth";

// Protege toda la app: si no hay sesión válida, manda al login.
export function middleware(request) {
  const session = request.cookies.get("viaje_session")?.value;

  if (session === SESSION_SECRET) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  // Todo excepto el login, la API de login y los archivos internos de Next.
  matcher: ["/((?!login|api/login|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
