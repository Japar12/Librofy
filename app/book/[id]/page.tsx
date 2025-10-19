"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Bookmark } from "lucide-react";

interface BookDetail {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  thumbnail?: string;
  previewLink?: string;
}

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  // Fetch book detail
  useEffect(() => {
    if (!params?.id) return;

    const fetchBook = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${params.id}`);
        const data = await res.json();
        const info = data.volumeInfo || {};

        setBook({
          id: params.id,
          title: info.title || "Tanpa Judul",
          authors: info.authors || [],
          description: info.description || "Tidak ada deskripsi.",
          thumbnail:
            info.imageLinks?.thumbnail?.replace("http://", "https://") ||
            "https://placehold.co/300x450?text=No+Cover",
          previewLink: info.previewLink,
        });
      } catch (err) {
        console.error(err);
        setBook({
          id: params?.id || "0",
          title: "Buku tidak ditemukan",
          description: "Tidak ada deskripsi.",
          thumbnail: "https://placehold.co/300x450?text=No+Cover",
        });
      }
    };

    fetchBook();
  }, [params?.id]);

  // Cek bookmark
  useEffect(() => {
    if (!book) return;
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      const list: BookDetail[] = JSON.parse(saved);
      setBookmarked(list.some((b) => b.id === book.id));
    }
  }, [book]);

  // Toggle bookmark
  const toggleBookmark = () => {
    if (!book) return;
    const saved = localStorage.getItem("bookmarks");
    let list: BookDetail[] = saved ? JSON.parse(saved) : [];

    if (bookmarked) {
      list = list.filter((b) => b.id !== book.id);
      toast.success("Buku dihapus dari bookmark!");
    } else {
      list.push(book);
      toast.success("Buku ditambahkan ke bookmark!");
    }

    localStorage.setItem("bookmarks", JSON.stringify(list));
    setBookmarked(!bookmarked);
  };

  if (!book) return <p className="text-center mt-10">📚 Memuat detail buku...</p>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 p-6">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Cover */}
        <Image
          src={book.thumbnail || "https://placehold.co/300x450?text=No+Cover"}
          alt={book.title}
          width={256}
          height={384}
          className="object-cover rounded-xl shadow-lg mx-auto md:mx-0"
        />

        {/* Detail */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-4xl font-extrabold">{book.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {book.authors?.join(", ") || "Penulis tidak diketahui"}
          </p>

          {/* Deskripsi */}
          <div
            className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-base leading-relaxed mt-4 flex-1"
            dangerouslySetInnerHTML={{ __html: book.description || "" }}
          />

          {/* Tombol baca & bookmark di pojok kanan */}
          <div className="flex justify-end gap-3 mt-4">
            {book.previewLink && (
              <Link
                href={book.previewLink}
                target="_blank"
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-shadow shadow-md hover:shadow-lg"
              >
                📖 Baca di Google Books
              </Link>
            )}

            <Link
              href={`/book/${book.id}/read`}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-shadow shadow-md hover:shadow-lg"
            >
              📖 Baca di Web
            </Link>

            <button
  onClick={toggleBookmark}
  className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-shadow shadow-md hover:shadow-lg ${
    bookmarked
      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
      : "bg-gray-300 hover:bg-gray-400 text-gray-900"
  }`}
>
  <Bookmark size={20} />
  {bookmarked ? "Bookmarked" : "Tambah Bookmark"}
</button>
          </div>
        </div>
      </div>
    </main>
  );
}
