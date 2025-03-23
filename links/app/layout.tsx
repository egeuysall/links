import type { Metadata } from "next";

// Styles and fonts
import "./globals.css";
import { spaceGrotesk, lato } from "./fonts";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Links is the fastest way to organize and share all your important links in one beautiful, customizable page. Lightning-fast and built for creators. Claim your link today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${lato.variable}`}>
      <body className={lato.className}>
        <div className="min-h-screen flex flex-col items-center justify-between">
          <main className="w-[85vw] max-w-7xl flex-1 flex flex-col py-4">
            <Header />
            <div className="flex-1 my-4">
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}