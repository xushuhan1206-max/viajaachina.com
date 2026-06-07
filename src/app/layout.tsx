import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ViajaAChina — Tu guía de viaje a China con IA",
  description:
    "Planifica tu viaje a China con inteligencia artificial. Rutas personalizadas, información de visa, pagos y transporte. Todo en español.",
  keywords: [
    "viajar a China",
    "China sin visa",
    "guía China español",
    "viaje China",
    "viajachina",
  ],
  metadataBase: new URL("https://viajachina.com"),
  openGraph: {
    title: "ViajaAChina — Tu guía de viaje a China con IA",
    description: "Planifica tu viaje a China con inteligencia artificial. Todo en español.",
    locale: "es_ES",
    type: "website",
    url: "https://viajachina.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="w-full overflow-x-hidden">
      <body className="min-h-screen flex flex-col w-full overflow-x-hidden">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
