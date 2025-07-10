export default function DashboardPage() {
    const users = [
      { name: "Marsya Delila", email: "marsyadelila@universitasmulia.ac.id", status: "Aktif", roles: ["Admin", "Employee"] },
      { name: "Azizah Chyntia", email: "azizahcy@universitasmulia.ac.id", status: "Aktif", roles: ["Admin","Employee"] },
    ];
  
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-pink-50 p-4 space-y-3">
          <h2 className="font-bold text-xl">Connect</h2>
          <div className="bg-pink-200 p-3 rounded flex items-center gap-2">🧍‍♂️ User</div>
          <div className="bg-pink-200 p-3 rounded flex items-center gap-2">📘 KamusKita</div>
          <div className="bg-pink-200 p-3 rounded flex items-center gap-2">🔓 Logout</div>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="font-bold text-xl mb-4">KamusKita</h2>
          <input
            type="text"
            placeholder="Cari kata gaul kamu"
            className="border p-2 w-full max-w-md mb-6 rounded"
          />
  
          <div className="space-y-4">
            {users.map((user, idx) => (
              <div key={idx} className="border rounded p-4 flex justify-between">
                <div>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
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