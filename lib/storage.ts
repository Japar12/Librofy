export interface Bookmark {
  id: string;
  title: string;
  thumbnail?: string;
  authors?: string[];
  source: "google" | "openlibrary" | "gutendex";
}

export function toggleBookmark(book: Bookmark): boolean {
  const saved: Bookmark[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  const exists = saved.find((b) => b.id === book.id);

  if (exists) {
    const filtered = saved.filter((b) => b.id !== book.id);
    localStorage.setItem("bookmarks", JSON.stringify(filtered));
    return false;
  } else {
    // pastikan authors ikut tersimpan
    saved.push({
      id: book.id,
      title: book.title,
      authors: book.authors || [],
      thumbnail: book.thumbnail,
      source: book.source,
    });
    localStorage.setItem("bookmarks", JSON.stringify(saved));
    return true;
  }
}


export function isBookmarked(id: string): boolean {
  const saved: Bookmark[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  return saved.some((b) => b.id === id);
}

export function getBookmark(id: string): Bookmark | undefined {
  const saved: Bookmark[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  return saved.find((b) => b.id === id);
}

export function getAllBookmarks(): Bookmark[] {
  return JSON.parse(localStorage.getItem("bookmarks") || "[]") as Bookmark[];
}
