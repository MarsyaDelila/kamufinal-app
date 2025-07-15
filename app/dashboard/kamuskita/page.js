"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function KamusKitaPage() {
  const router = useRouter();

  const [dataKamus, setDataKamus] = useState([]);
  const [search, setSearch] = useState("");
  const [newWord, setNewWord] = useState({ kata: "", arti: "", author: "" });
  const [darkMode, setDarkMode] = useState(false);

  // Ambil data dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("kamusData");
    if (stored) {
      setDataKamus(JSON.parse(stored));
    } else {
      setDataKamus([
        { kata: "Bestie", arti: "Sahabat dekat banget", author: "Marsya" },
        { kata: "Flexing", arti: "Pamer secara berlebihan", author: "Anon" },
        { kata: "Healing", arti: "Liburan biar waras", author: "Netijen" },
        { kata: "Gaje", arti: "Gak jelas", author: "Tia" },
        { kata: "Bucin", arti: "Budak cinta", author: "Rajesh" },
      ]);
    }

    const storedDark = localStorage.getItem("darkMode");
    if (storedDark === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kamusData", JSON.stringify(dataKamus));
  }, [dataKamus]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const filteredData = dataKamus.filter((item) =>
    item.kata.toLowerCase().includes(search.toLowerCase())
  );

  const handleTambah = (e) => {
    e.preventDefault();
    if (newWord.kata && newWord.arti && newWord.author) {
      setDataKamus([...dataKamus, newWord]);
      setNewWord({ kata: "", arti: "", author: "" });
    }
  };

  const toggleDark = () => setDarkMode(!darkMode);

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Sidebar */}
      <div className={`w-64 ${darkMode ? "bg-gray-800" : "bg-pink-50"} p-4 space-y-3`}>
        <h2 className="font-bold text-xl">Connect</h2>
        <button onClick={() => router.push("/dashboard")} className={`${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-pink-200 hover:bg-pink-300"} p-3 rounded w-full text-left flex items-center gap-2`}>🧍‍♂️ User</button>
        <button onClick={() => router.push("/dashboard/kamuskita")} className={`${darkMode ? "bg-gray-600 font-semibold" : "bg-pink-300 font-semibold"} p-3 rounded w-full text-left flex items-center gap-2`}>📘 KamusKita</button>
        <button onClick={() => router.push("/")} className={`${darkMode ? "bg-pink-500 hover:bg-pink-700" : "bg-pink-200 hover:bg-red-200"} p-3 rounded w-full text-left flex items-center gap-2`}>🔓 Logout</button>

        {/* Toggle darkmode */}
        <div className="mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm">{darkMode ? "🌜" : "🌞"}</span>
            <div className="relative">
              <input type="checkbox" checked={darkMode} onChange={toggleDark} className="sr-only" />
              <div className={`w-10 h-5 rounded-full transition duration-300 ${darkMode ? "bg-pink-800" : "bg-gray-400"}`}></div>
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 transform ${
                  darkMode ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4"> KamusKita</h2>

        <input
          type="text"
          placeholder="Cari istilah gaul..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-full mb-6 bg-pink-50 text-black"
        />

        <div className="space-y-4 mb-10">
          {filteredData.map((item, idx) => (
            <div key={idx} className={`border p-4 rounded shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="text-lg font-bold">{item.kata}</h3>
              <p className="text-gray-400">{item.arti}</p>
              <p className="text-sm text-gray-500">Ditambahkan oleh: {item.author}</p>
            </div>
          ))}
          {filteredData.length === 0 && (
            <p className="text-gray-400 italic">Tidak ada kata yang cocok.</p>
          )}
        </div>

        <form onSubmit={handleTambah} className={`space-y-2 w-full p-4 rounded shadow ${darkMode ? "bg-gray-800" : "bg-pink-50"}`}>
          <h3 className="font-semibold text-lg">Tambah Kata Baru</h3>
          <input
            type="text"
            placeholder="Kata"
            value={newWord.kata}
            onChange={(e) => setNewWord({ ...newWord, kata: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="text"
            placeholder="Arti"
            value={newWord.arti}
            onChange={(e) => setNewWord({ ...newWord, arti: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="text"
            placeholder="Ditambahkan oleh"
            value={newWord.author}
            onChange={(e) => setNewWord({ ...newWord, author: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
          <button type="submit" className="bg-pink-300 text-white py-2 px-4 rounded hover:bg-pink-400">
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
}
