import "./globals.css";

export const metadata = {
  title: "Viaje USA 2026",
  description: "Orlando y Miami · 5 al 10 de diciembre",
  icons: { icon: "/icon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffb3d9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
