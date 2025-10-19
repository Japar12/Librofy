"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import BookCard, { Book } from "@/components/BookCard";

interface GoogleBookVolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
}

interface GoogleBookItem {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (q: string) => {
    setLoading(true);
    try {
      const search = encodeURIComponent(q.trim() || "buku");
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}`
      );
      const data = await res.json();

      const items: GoogleBookItem[] = data.items || [];

      const formatted: Book[] = items.map((b) => ({
        id: b.id,
        title: b.volumeInfo?.title || "Tanpa Judul",
        authors: b.volumeInfo?.authors || [],
        thumbnail:
          b.volumeInfo?.imageLinks?.thumbnail?.replace("http://", "https://") ||
          "https://placehold.co/300x450?text=No+Cover",
        source: "google",
      }));

      setBooks(formatted);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(""); // default
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(query);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      <header className="max-w-3xl mx-auto text-center mt-12 mb-6 px-4">
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
          Temukan Buku 📚
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Cari buku berdasarkan judul atau nama penulis
        </p>
      </header>

      <form
        onSubmit={handleSearch}
        className="max-w-3xl mx-auto flex gap-3 px-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul atau penulis..."
            className="w-full rounded-lg border p-3 pl-10 bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700"
          />
        </div>
        <button className="bg-indigo-600 text-white px-5 py-3 rounded-lg flex items-center gap-2">
          <Search className="w-4 h-4" /> Cari
        </button>
      </form>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {loading ? (
          <p className="text-center text-gray-500 mt-10 animate-pulse">
            Memuat buku...
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Tidak ada hasil ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
            {books.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
