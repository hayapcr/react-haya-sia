import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaLock, FaBan } from "react-icons/fa";

export default function ErrorPage({ code }) {
  
  // 🔥 SETTING PER ERROR
  const config = {
    "400": {
      title: "Bad Request",
      message: "Permintaan tidak valid. Silakan cek kembali input.",
      color: "yellow",
      icon: <FaExclamationTriangle />,
    },
    "401": {
      title: "Unauthorized",
      message: "Kamu harus login untuk mengakses halaman ini.",
      color: "blue",
      icon: <FaLock />,
    },
    "403": {
      title: "Forbidden",
      message: "Kamu tidak memiliki akses ke halaman ini.",
      color: "red",
      icon: <FaBan />,
    },
    "404": {
      title: "Halaman Tidak Ditemukan",
      message: "Maaf, terjadi kesalahan. Silakan kembali ke halaman utama.",
      color: "red",
      icon: <FaExclamationTriangle />,
    },
  };

  // 🎨 Mapping warna (FIX Tailwind)
  const colorClass = {
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-500",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-500",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-500",
    },
  };

  const current = config[code] || config["404"];
  const color = colorClass[current.color];

  return (
    <div className="flex items-center justify-center px-6 h-[calc(80vh-80px)]">
      <div className="max-w-md w-full text-center">

        {/* ICON */}
        <div className={`inline-flex items-center justify-center w-24 h-24 ${color.bg} ${color.text} rounded-full mb-8 shadow-lg`}>
          {current.icon}
        </div>

        {/* ERROR CODE */}
        <p className={`text-sm font-bold uppercase tracking-[0.2em] ${color.text} mb-2`}>
          ERROR {code}
        </p>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {current.title}
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 mb-10 leading-relaxed">
          {current.message}
        </p>

        {/* BUTTON */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow"
          >
            Kembali ke Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="text-gray-600 flex justify-center items-center gap-2"
          >
            ← Halaman Sebelumnya
          </button>
        </div>
      </div>
    </div>
  );
}