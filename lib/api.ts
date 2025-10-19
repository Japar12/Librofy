export async function getBooks(query = "fiction", lang = "id") {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&orderBy=newest&maxResults=12`
  );
  const data = await res.json();
  return data.items || [];
}
