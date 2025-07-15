"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode");
    if (storedDark === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDark = () => setDarkMode(!darkMode);

  const users = [
    {
      name: "Marsya Delila",
      email: "marsyadelila@universitasmulia.ac.id",
      status: "Aktif",
      roles: ["Admin", "Employee"],
    },
    {
      name: "Azizah Chyntia",
      email: "azizahcy@universitasmulia.ac.id",
      status: "Aktif",
      roles: ["Admin", "Employee"],
    },
  ];

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Sidebar */}
      <div className={`w-64 ${darkMode ? "bg-gray-800" : "bg-pink-50"} p-4 space-y-3`}>
        <h2 className="font-bold text-xl">Connect</h2>

        <button
          onClick={() => router.push("/dashboard")}
          className={`${darkMode ? "bg-gray-700 hover: bg-gray-600" : "bg-pink-300"} p-3 rounded w-full text-left flex items-center gap-2 font-semibold`}
        >
          🧍‍♂️ User
        </button>

        <button
          onClick={() => router.push("/dashboard/kamuskita")}
          className={`${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-pink-200 hover:bg-pink-300"} p-3 rounded w-full text-left flex items-center gap-2`}
        >
          📘 KamusKita
        </button>

        <button
          onClick={() => router.push("/")}
          className={`${darkMode ? "bg-pink-600 hover:bg-pink-700" : "bg-pink-200 hover:bg-red-200"} p-3 rounded w-full text-left flex items-center gap-2`}
        >
          🔓 Logout
        </button>

        {/* Switch Toggle */}
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
        <h2 className="font-bold text-xl mb-4">User Management</h2>

        <input
          type="text"
          placeholder="Cari user"
          className={`border p-2 w-full max-w-full bg-pink-50 mb-6 rounded ${darkMode ? "bg-gray-800 text-white" : ""}`}
        />

        <div className="space-y-4">
          {users.map((user, idx) => (
            <div key={idx} className={`border rounded p-4 flex justify-between ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div>
                <div className="font-bold">{user.name}</div>
                <div className="text-sm text-gray-400">{user.email}</div>
                <div className="mt-1 space-x-2">
                  {user.roles.map((role, i) => (
                    <span
                      key={i}
                      className="inline-block bg-pink-100 text-black text-xs px-2 py-1 rounded"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`font-bold ${user.status === "Suspended" ? "text-gray-400" : ""}`}>
                {user.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
