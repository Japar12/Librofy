"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllBookmarks, Bookmark } from "@/lib/storage";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(getAllBookmarks());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-950 px-6 py-10">
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        🔖 Buku Tersimpan
      </h2>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada buku yang disimpan.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarks.map((book) => (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {/* Cover */}
              <div className="relative w-full h-60">
                <Image
                  src={book.thumbnail || "https://placehold.co/300x450?text=No+Cover"}
                  alt={book.title || "Buku tanpa judul"}
                  width={256}
                  height={384}
                  className="object-cover rounded-xl"
                />
              </div>

              {/* Title & Authors */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg line-clamp-2">
                  {book.title || "Buku tanpa judul"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                  {book.authors?.join(", ") || "Penulis tidak diketahui"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
