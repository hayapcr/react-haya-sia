import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Customers from "../data/Customers.json";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-8 bg-[#f0f9f4] min-h-screen font-sans">
      <PageHeader
        title={
          <span className="text-3xl font-bold text-gray-800">
            Customers
          </span>
        }
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center gap-2"
        >
          {showForm ? "✕ Close" : "+ Add Customer"}
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <form className="bg-white/70 backdrop-blur-md p-8 mb-10 rounded-[2rem] shadow-xl border border-white/50 animate-in fade-in zoom-in duration-300">
          <h3 className="text-xl font-bold mb-6 text-gray-700">
            New Customer Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              placeholder="Customer Name"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />

            <input
              placeholder="Email"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />

            <input
              placeholder="Phone"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />

            <select className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all text-gray-500">
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-[#059669] hover:bg-[#047857] text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
              ✓ Save Customer
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[#059669]">
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Customer ID
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Name
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Email
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Phone
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-center">
                Loyalty
              </th>
            </tr>
          </thead>

          <tbody className="bg-transparent">
            {customers.map((c) => (
              <tr
                key={c.customerId}
                className="group hover:scale-[1.01] transition-transform duration-200"
              >
                {/* CUSTOMER ID */}
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 first:rounded-l-2xl font-mono font-bold text-gray-500">
                  {c.customerId}
                </td>

                {/* NAME */}
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 font-bold text-gray-800">
                  <Link
                    to={`/customers/${c.customerId}`}
                    className="flex items-center gap-3 text-emerald-600 hover:text-emerald-800 hover:underline"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xs">
                      {c.customerName.charAt(0)}
                    </div>

                    {c.customerName}
                  </Link>
                </td>

                {/* EMAIL */}
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-gray-600 italic">
                  {c.email}
                </td>

                {/* PHONE */}
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-gray-700 font-medium">
                  {c.phone}
                </td>

                {/* LOYALTY */}
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 last:rounded-r-2xl text-center">
                  <span
                    className={`px-5 py-2 rounded-full text-xs font-black shadow-sm
                    ${
                      c.loyalty === "Gold"
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                        : c.loyalty === "Silver"
                        ? "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
                        : "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                    }`}
                  >
                    {c.loyalty.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}