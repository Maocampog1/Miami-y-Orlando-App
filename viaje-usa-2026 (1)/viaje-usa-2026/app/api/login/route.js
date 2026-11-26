import { NextResponse } from "next/server";
import { APP_USER, APP_PASSWORD, SESSION_SECRET } from "../../../lib/auth";

export async function POST(request) {
  const { user, password } = await request.json().catch(() => ({}));

  if (user !== APP_USER || password !== APP_PASSWORD) {
    return NextResponse.json({ error: "Usuario o contraseña incorrectos." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("viaje_session", SESSION_SECRET, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });
  return res;
}
