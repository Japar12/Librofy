"use client";
import Link from "next/link";
import { BookOpen, Heart, Moon, Sun, Eye } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md border-b shadow-sm
      transition-colors duration-500 ease-in-out
      bg-[color-mix(in_srgb,var(--bg)_90%,white)]
      border-[color-mix(in_srgb,var(--fg)_10%,transparent)]"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-indigo-600"
        >
          <BookOpen className="w-7 h-7" />
          Librofy
        </Link>

        <div className="flex gap-6 items-center font-medium">
          <Link href="/" className="hover:text-indigo-600 transition-colors duration-300">
            Beranda
          </Link>
          <Link
            href="/bookmarks"
            className="hover:text-indigo-600 transition-colors duration-300 flex items-center gap-1"
          >
            <Heart className="w-4 h-4" /> Bookmark
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors duration-300"
            title="Ganti Tema"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : theme === "dark" ? (
              <Eye className="w-5 h-5 text-amber-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
