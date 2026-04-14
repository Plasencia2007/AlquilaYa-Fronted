import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlquilaYa",
  description: "Encuentra tu próximo cuarto de forma rápida y segura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
