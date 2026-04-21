import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 text-red-500 rounded-full mb-8 shadow-lg animate-bounce">
          <FaExclamationTriangle size={48} />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 mb-2">
          Error 404
        </p>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Halaman Hilang!
        </h1>

        <p className="text-gray-500 mb-10 leading-relaxed">
          Maaf Haya, sepertinya data yang kamu cari sedang tidak ada di tempat. 
          Yuk balik ke dashboard untuk cek aktivitas lainnya! 🚀
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-green-200 hover:scale-[1.02] transition-all duration-200"
          >
            Kembali ke Dashboard
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 text-gray-600 font-medium py-3 hover:text-green-600 transition-colors"
          >
            <FaArrowLeft size={14} />
            Halaman Sebelumnya
          </button>
        </div>

        <div className="mt-16 opacity-20 flex justify-center gap-2">
          <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
          <div className="h-1.5 w-8 bg-gray-400 rounded-full"></div>
          <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}