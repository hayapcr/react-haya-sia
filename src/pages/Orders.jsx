import { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { calculateOrderTotals, ordersAPI } from "../services/supabaseDataAPI";
import { useAuth } from "../hooks/useAuth";

export default function Orders() {
  const { role, user, profile, refreshProfile } = useAuth();
  const isAdmin = role === "admin";
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    customerName: "",
    status: "pending",
    totalPrice: "",
    orderDate: "",
  });

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await ordersAPI.fetchOrders(role, user?.id);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [role, user?.id]);

  useEffect(() => {
    if (user?.id) loadOrders();
  }, [loadOrders, user?.id]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await ordersAPI.createOrder({
        userId: user.id,
        totalOriginalPrice: Number(dataForm.totalPrice),
        tier: profile?.tier || "Bronze",
        status: dataForm.status,
      });

      setDataForm({
        customerName: "",
        status: "pending",
        totalPrice: "",
        orderDate: "",
      });
      setShowForm(false);
      setSuccess("Order berhasil dibuat. Poin dan tier akan diperbarui otomatis.");
      await refreshProfile();
      await loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await ordersAPI.updateOrder(id, { status });
      setSuccess("Status order berhasil diperbarui.");
      await loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Yakin ingin menghapus order ini?");
    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await ordersAPI.deleteOrder(id);
      setSuccess("Order berhasil dihapus.");
      await loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const preview = calculateOrderTotals(
    Number(dataForm.totalPrice || 0),
    profile?.tier || "Bronze"
  );

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
          {showForm ? "âœ• Close" : "+ Add Orders"}
        </button>
      </PageHeader>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* FORM - Modern Glassmorphism */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md p-8 mb-10 rounded-[2rem] shadow-xl border border-white/50 animate-in fade-in zoom-in duration-300">
          <h3 className="text-xl font-bold mb-6 text-gray-700">Create New Order</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              name="customerName"
              value={dataForm.customerName}
              onChange={handleChange}
              placeholder="Customer Name"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />
            <select name="status" value={dataForm.status} onChange={handleChange} className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all text-gray-500">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              name="totalPrice"
              value={dataForm.totalPrice}
              onChange={handleChange}
              placeholder="Total Price (e.g. 50000)"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />
            <input
              name="orderDate"
              value={dataForm.orderDate}
              onChange={handleChange}
              type="date"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all text-gray-500"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Tier {profile?.tier || "Bronze"} memberi diskon {Math.round(preview.discountApplied * 100)}%.
            Total akhir Rp {preview.totalFinalPrice.toLocaleString("id-ID")} dan poin {preview.pointsEarned}.
          </p>
          <div className="flex justify-end mt-6">
            <button disabled={loading} className="bg-[#059669] hover:bg-[#047857] text-white px-10 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
              Save Order
            </button>
          </div>
        </form>
      )}

      {/* TABLE SECTION */}
      <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
        {loading && <LoadingSpinner text="Memuat order..." />}
        {!loading && (
          <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#059669]">
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">Order ID</th>
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">Customer</th>
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-center">Status</th>
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">Total Price</th>
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">Date</th>
              {isAdmin && (
                <th className="p-5 text-sm font-bold uppercase tracking-widest text-center">Aksi</th>
              )}
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="group hover:scale-[1.01] transition-transform duration-200 cursor-default">
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 first:rounded-l-2xl last:rounded-r-2xl font-mono font-bold text-gray-400">
                  #{String(o.id).slice(0, 8)}
                </td>
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 font-bold text-gray-800">
                  {o.profiles?.full_name || o.profiles?.email || "Member"}
                </td>
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-sm uppercase
                    ${o.status === 'completed' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 
                      o.status === 'pending' ? 'bg-amber-100 text-amber-600 border border-amber-200' : 
                      'bg-rose-100 text-rose-600 border border-rose-200'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 font-bold text-gray-700">
                  <span className="text-green-600 mr-1 text-xs">Rp</span>
                  {Number(o.total_final_price).toLocaleString('id-ID')}
                </td>
                <td className="p-5 bg-gray-50 group-hover:bg-green-50 first:rounded-l-2xl last:rounded-r-2xl text-gray-500 text-sm">
                  {new Date(o.created_at).toLocaleDateString("id-ID")}
                </td>
                {isAdmin && (
                  <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-center rounded-r-2xl">
                    <select value={o.status} onChange={(evt) => handleStatusChange(o.id, evt.target.value)} className="text-xs border border-gray-200 rounded-lg px-2 py-1 mr-3">
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button onClick={() => handleDelete(o.id)} className="text-xs font-bold text-red-600 hover:text-red-800">
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}
