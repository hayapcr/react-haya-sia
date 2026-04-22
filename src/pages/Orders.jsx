import { useState } from "react";
import PageHeader from "../components/PageHeader";
import orders from "../data/Orders";

export default function Orders() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-8 bg-[#f0f9f4] min-h-screen font-sans">
      <PageHeader
        title={<span className="text-3xl font-bold text-gray-800">Orders </span>}
        breadcrumb={["Dashboard", "Orders"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center gap-2"
        >
          {showForm ? "✕ Close" : "+ Add Orders"}
        </button>
      </PageHeader>

      {/* FORM - Modern Glassmorphism */}
      {showForm && (
        <form className="bg-white/70 backdrop-blur-md p-8 mb-10 rounded-[2rem] shadow-xl border border-white/50 animate-in fade-in zoom-in duration-300">
          <h3 className="text-xl font-bold mb-6 text-gray-700">Create New Order</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              placeholder="Customer Name"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />
            <select className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all text-gray-500">
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <input
              placeholder="Total Price (e.g. 50000)"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />
            <input
              type="date"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all text-gray-500"
            />
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-[#059669] hover:bg-[#047857] text-white px-10 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
              Save Order
            </button>
          </div>
        </form>
      )}

      {/* TABLE SECTION */}
      <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#059669]">
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">Order ID</th>
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">Customer</th>
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-center">Status</th>
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">Total Price</th>
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.orderId} className="group hover:scale-[1.01] transition-transform duration-200 cursor-default">
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 first:rounded-l-2xl last:rounded-r-2xl font-mono font-bold text-gray-400">
                  #{o.orderId}
                </td>
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 font-bold text-gray-800">
                  {o.customerName}
                </td>
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-sm uppercase
                    ${o.status === 'Completed' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 
                      o.status === 'Pending' ? 'bg-amber-100 text-amber-600 border border-amber-200' : 
                      'bg-rose-100 text-rose-600 border border-rose-200'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 font-bold text-gray-700">
                  <span className="text-green-600 mr-1 text-xs">Rp</span>
                  {o.totalPrice.toLocaleString('id-ID')}
                </td>
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 first:rounded-l-2xl last:rounded-r-2xl text-gray-500 text-sm">
                  {o.orderDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}