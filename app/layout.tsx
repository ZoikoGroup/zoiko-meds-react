import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Zoi } from "@/components/zoi";
import ClientTimezone from "@/components/layout/ClientTimezone";
import LanguageSuggestion from "@/components/language/LanguageSuggestion";
import LocaleProvider from "@/components/language/LocaleProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZoikoMeds — Intelligent Healthcare Platform",
  description: "ZoikoMeds connects patients, pharmacies, and enterprises through intelligent healthcare infrastructure.",
  verification: {
    google: "JK9Zkd6K7CJmyWSHWUvdd6DbjQyL0s-ow_KX3fkBFrc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
        {/*
          The language a visitor has chosen lives in a cookie and is applied on
          the client, so these pages stay statically generated. `lang` above is
          the language the HTML is built in; LocaleProvider updates it when a
          visitor has picked another one.
        */}
        <LocaleProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Zoi />
          {/* Records the visitor's timezone for form confirmation emails. Renders nothing. */}
          <ClientTimezone />
          {/* Offers the language of the visitor's region once; never switches on its own. */}
          <LanguageSuggestion />
        </LocaleProvider>
      </body>
    </html>
  );
}