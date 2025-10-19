"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Headset } from "lucide-react";

export default function BookReadPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [downloadLinks, setDownloadLinks] = useState<{ [key: string]: string }>({});
  const [previewLink, setPreviewLink] = useState<string | null>(null);

  // Fetch Gutendex text
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://gutendex.com/books/${params.id}`);
        const data = await res.json();

        setTitle(data.title || "Buku");

        // Ambil teks HTML / Plain
        const textUrl =
          data.formats["text/html"] ||
          data.formats["text/plain; charset=utf-8"] ||
          data.formats["text/plain"];
        if (textUrl) {
          const txt = await (await fetch(textUrl)).text();
          setText(txt);
        } else {
          setText("");
        }

        setDownloadLinks(data.formats || {});
      } catch (err) {
        console.error(err);
        setTitle("Buku tidak ditemukan");
        setText("");
        setDownloadLinks({});
      }
    };
    fetchBook();
  }, [params.id]);

  // Fetch Google Books preview link
  useEffect(() => {
    const fetchGoogleLink = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${params.id}`);
        const data = await res.json();
        setPreviewLink(data.volumeInfo?.previewLink || null);
      } catch (err) {
        console.error(err);
        setPreviewLink(null);
      }
    };
    fetchGoogleLink();
  }, [params.id]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voicesArray: SpeechSynthesisVoice[] = speechSynthesis.getVoices();
      setVoices(voicesArray);
      setVoice(
        voicesArray.find((v) => v.lang.startsWith("en")) ?? voicesArray[0] ?? null
      );
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text || !voice) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.lang = voice.lang;
    speechSynthesis.speak(utter);
    setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:underline"
        >
          ← Kembali
        </button>

        {text && (
          <div className="flex items-center gap-3">
            <select
              value={voice?.name}
              onChange={(e) =>
                setVoice(
                  voices.find((v) => v.name === e.target.value) ?? null
                )
              }
              className="px-2 py-1 rounded border dark:bg-neutral-800"
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>

            {!isSpeaking ? (
              <button
                onClick={speak}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                <Headset /> ▶️ Bacakan
              </button>
            ) : (
              <button
                onClick={stop}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                ⏹️ Stop
              </button>
            )}
          </div>
        )}
      </header>

      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {text ? (
        <div className="prose max-w-none text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {text}
        </div>
      ) : (
        <div className="text-gray-500">
          ❌ Buku ini tidak tersedia untuk dibaca online.
          {Object.keys(downloadLinks).length > 0 && (
            <div className="mt-2">
              Bisa diunduh:{" "}
              {Object.entries(downloadLinks).map(([type, url]) => (
                <a
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mr-2"
                >
                  {type}
                </a>
              ))}
            </div>
          )}
          {previewLink && (
            <div className="mt-4">
              Atau coba{" "}
              <a
                href={previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                📖 Baca di Google Books
              </a>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
