import { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  return (
    <div>
      <PageHeader
        title={<span className="text-3xl font-extrabold text-gray-800">Dashboard</span>}
        breadcrumb={["Dashboard"]}
      >
        <button
          className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center gap-2"
        >
          + Add Data
        </button>
      </PageHeader>

      {/* Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#10b981] via-[#0fb47d] to-[#059669] text-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,185,129,0.2)] mb-8 flex items-center justify-between group">

        <div className="absolute -right-10 -top-10 w-72 h-72 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="absolute left-1/4 -bottom-12 w-40 h-40 bg-black/5 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-2 tracking-tight">
            Welcome Back, <span className="text-emerald-100">Haya</span> 👋
          </h2>
          <p className="text-lg opacity-90 font-medium max-w-md leading-relaxed text-emerald-50">
            Semoga harimu menyenangkan! Yuk cek aktivitas dan performa bisnismu hari ini 🚀
          </p>

          <div className="flex gap-3 mt-6">
            <button className="bg-white text-[#10b981] px-7 py-3 rounded-2xl text-sm font-extrabold hover:bg-emerald-50 transition-all shadow-lg active:scale-95">
              Lihat Detail Aktivitas
            </button>
            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-7 py-3 rounded-2xl text-sm font-bold hover:bg-white/30 transition-all">
              Laporan PDF
            </button>
          </div>
        </div>

        <div className="relative hidden md:block group-hover:translate-y-[-10px] group-hover:rotate-3 transition-all duration-500">
          <div className="text-[120px] leading-none drop-shadow-2xl filter saturate-150">
            📊
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/10 rounded-[100%] blur-xl"></div>
        </div>
      </div>

      {/* Cards */}
      <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">

        <div
          onClick={() => {
            setModalData("Total Orders: 75");
            setIsOpen(true);
          }}
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl hover:scale-105 transition"
        >
          <div className="bg-hijau rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">75</span>
            <span className="text-gray-400">Total Orders</span>
          </div>
        </div>

        <div
          onClick={() => {
            setModalData("Total Delivered: 175");
            setIsOpen(true);
          }}
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl hover:scale-105 transition"
        >
          <div className="bg-biru rounded-full p-4">
            <FaTruck className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">175</span>
            <span className="text-gray-400">Total Delivered</span>
          </div>
        </div>

        <div
          onClick={() => {
            setModalData("Total Canceled: 40");
            setIsOpen(true);
          }}
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl hover:scale-105 transition"
        >
          <div className="bg-merah rounded-full p-4">
            <FaBan className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">40</span>
            <span className="text-gray-400">Total Canceled</span>
          </div>
        </div>

        <div
          onClick={() => {
            setModalData("Total Revenue: Rp.128");
            setIsOpen(true);
          }}
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl hover:scale-105 transition"
        >
          <div className="bg-kuning rounded-full p-4">
            <FaDollarSign className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Rp.128</span>
            <span className="text-gray-400">Total Revenue</span>
          </div>
        </div>

      </div>

      {/* MODAL */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl w-80 text-center transform transition duration-300 scale-95 animate-[fadeIn_0.3s_ease-out]"
          >
            <div className="text-4xl mb-2">📊</div>
            <h2 className="text-lg font-bold mb-2">Detail</h2>
            <p className="text-gray-600 mb-4">{modalData}</p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
}