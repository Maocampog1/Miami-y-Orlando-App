// Usuario y contraseña de la app.
// Este archivo solo se usa en el servidor: no se envía al navegador.
// (Si algún día quieres cambiarlos sin tocar el código, puedes crear las
// variables APP_USER, APP_PASSWORD y SESSION_SECRET en Vercel y tendrán prioridad.)

export const APP_USER = process.env.APP_USER || "Alpaquita";
export const APP_PASSWORD = process.env.APP_PASSWORD || "011235813";
export const SESSION_SECRET =
  process.env.SESSION_SECRET || "alpaquita-orlando-miami-2026-sesion-k7Qp2xZr9LmW";
