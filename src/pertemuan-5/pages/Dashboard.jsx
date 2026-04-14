import { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  return (
    <div>
      <PageHeader />

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-md mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Welcome Back, Haya 👋
          </h2>
          <p className="text-sm opacity-90">
            Semoga harimu menyenangkan! Yuk cek aktivitas hari ini 🚀
          </p>

          <button className="mt-3 bg-white text-green-600 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition">
            Lihat Detail
          </button>
        </div>

        <div className="text-5xl opacity-80">📊</div>
      </div>

      {/* Cards */}
      <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">

        {/* Orders */}
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

        {/* Delivered */}
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

        {/* Canceled */}
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

        {/* Revenue */}
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

      {/* MODAL KEREN */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl w-80 text-center transform transition duration-300 scale-95 animate-[fadeIn_0.3s_ease-out]"
          >
            {/* Icon */}
            <div className="text-4xl mb-2">📊</div>

            {/* Title */}
            <h2 className="text-lg font-bold mb-2">Detail</h2>

            {/* Content */}
            <p className="text-gray-600 mb-4">{modalData}</p>

            {/* Button */}
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