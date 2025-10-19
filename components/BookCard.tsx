"use client";
import Link from "next/link";
import Image from "next/image";
export interface Book {
  id: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
  source?: string;
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 
                 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative w-full h-64">
        <Image
          src={book.thumbnail || "https://placehold.co/300x450?text=No+Cover"} // fallback
          alt={book.title || "Buku tanpa judul"} // fallback alt
          width={300}   // sesuaikan ukuran
          height={450}  // sesuaikan ukuran
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {book.authors?.join(", ") || "Penulis tidak diketahui"}
        </p>
        {book.source && (
          <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-2 capitalize">
            📖 {book.source}
          </p>
        )}
      </div>
    </Link>
  );
}
