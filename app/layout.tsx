import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

// Font bawaan Next.js + tambahan Tailwind Poppins (dari globals.css)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "📚 Librofy",
  description: "Temukan, baca, dan simpan buku favoritmu di satu tempat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          font-sans
          bg-gray-50 text-gray-900
          dark:bg-neutral-950 dark:text-gray-100
          selection:bg-indigo-600 selection:text-white
        `}
      >
        {/* Konten halaman */}
       <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>

        {/* Toast Notification */}
        <Toaster
          position="top-center"
          toastOptions={{
            className: "bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg px-4 py-2",
            success: {
              iconTheme: {
                primary: "#4F46E5",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
