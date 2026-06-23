import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { productsAPI } from "../services/supabaseDataAPI";
import { useAuth } from "../hooks/useAuth";

export default function Products() {
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [dataForm, setDataForm] = useState({
    name: "",
    code: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productsAPI.fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const resetForm = () => {
    setDataForm({
      name: "",
      code: "",
      category: "",
      brand: "",
      price: "",
      stock: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        name: dataForm.name,
        code: dataForm.code,
        category: dataForm.category,
        brand: dataForm.brand,
        price: Number(dataForm.price),
        stock: Number(dataForm.stock),
      };

      if (editingId) {
        await productsAPI.updateProduct(editingId, payload);
        setSuccess("Produk berhasil diperbarui.");
      } else {
        await productsAPI.createProduct(payload);
        setSuccess("Produk berhasil ditambahkan.");
      }

      resetForm();
      setShowForm(false);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setDataForm({
      name: product.name || "",
      code: product.code || "",
      category: product.category || "",
      brand: product.brand || "",
      price: product.price || "",
      stock: product.stock || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Yakin ingin menghapus produk ini?");
    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await productsAPI.deleteProduct(id);
      setSuccess("Produk berhasil dihapus.");
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#f0f9f4] min-h-screen font-sans">
      <PageHeader
        title={
          <span className="text-3xl font-bold text-gray-800">Products</span>
        }
        breadcrumb={["Dashboard", "Products"]}
      >
        {isAdmin && (
          <button
            onClick={() => {
              if (showForm) resetForm();
              setShowForm(!showForm);
            }}
            className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-2xl font-bold shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center gap-2"
          >
            {showForm ? "âœ• Close" : "+ Add Product"}
          </button>
        )}
      </PageHeader>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* FORM */}
      {showForm && isAdmin && (
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md p-8 mb-10 rounded-[2rem] shadow-xl border border-white/50 animate-in fade-in zoom-in duration-300">
          <h3 className="text-xl font-bold mb-6 text-gray-700">
            {editingId ? "Update Product" : "Create New Product"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              name="name"
              value={dataForm.name}
              onChange={handleChange}
              placeholder="Product Title"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />

            <input
              name="code"
              value={dataForm.code}
              onChange={handleChange}
              placeholder="Product Code"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />

            <input
              name="category"
              value={dataForm.category}
              onChange={handleChange}
              placeholder="Category"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />

            <input
              name="brand"
              value={dataForm.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />

            <input
              name="price"
              value={dataForm.price}
              onChange={handleChange}
              type="number"
              placeholder="Price"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />

            <input
              name="stock"
              value={dataForm.stock}
              onChange={handleChange}
              type="number"
              placeholder="Stock"
              className="bg-white border-2 border-green-100 focus:border-green-400 focus:outline-none p-3 rounded-xl w-full transition-all"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button disabled={loading} className="bg-[#059669] hover:bg-[#047857] text-white px-10 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
              {editingId ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
        {loading && <LoadingSpinner text="Memuat produk..." />}
        {!loading && (
          <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#059669]">
              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                ID
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Code
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Product
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Category
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Brand
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-left">
                Price
              </th>

              <th className="p-5 text-sm font-bold uppercase tracking-widest text-center">
                Stock
              </th>

              {isAdmin && (
                <th className="p-5 text-sm font-bold uppercase tracking-widest text-center">
                  Aksi
                </th>
              )}
            </tr>
          </thead>

          <tbody>
  {products.map((p) => (
    <tr
      key={p.id}
      className="group hover:scale-[1.01] transition-transform duration-200 cursor-default"
    >
      {/* ID */}
      <td className="p-5 bg-gray-50 group-hover:bg-green-50 first:rounded-l-2xl font-bold text-gray-700">
        {String(p.id).slice(0, 8)}
      </td>

      {/* CODE */}
      <td className="p-5 bg-gray-50 group-hover:bg-green-50 font-bold text-gray-700">
        {p.code || "-"}
      </td>

      {/* PRODUCT */}
      <td className="p-5 bg-gray-50 group-hover:bg-green-50 font-bold text-gray-800">
        <Link
          to={`/products/${p.id}`}
          className="text-emerald-500 hover:text-emerald-700 hover:underline"
        >
          {p.name}
        </Link>
      </td>

      {/* CATEGORY */}
      <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-gray-600">
        {p.category || "-"}
      </td>

      {/* BRAND */}
      <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-gray-700 font-semibold">
        {p.brand || "-"}
      </td>

      {/* PRICE */}
      <td className="p-5 bg-gray-50 group-hover:bg-green-50 font-bold text-gray-700">
        <span className="text-green-600 mr-1 text-xs">Rp</span>
        {Number(p.price).toLocaleString("id-ID")}
      </td>

      {/* STOCK */}
      <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-center rounded-r-2xl">
        <span
          className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-sm uppercase
          ${
            p.stock > 20
              ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
              : p.stock > 10
                ? "bg-amber-100 text-amber-600 border border-amber-200"
                : "bg-rose-100 text-rose-600 border border-rose-200"
          }`}
        >
          {p.stock} pcs
        </span>
      </td>

      {isAdmin && (
        <td className="p-5 bg-gray-50 group-hover:bg-green-50 text-center rounded-r-2xl">
          <button onClick={() => handleEdit(p)} className="text-xs font-bold text-blue-600 hover:text-blue-800 mr-3">
            Edit
          </button>
          <button onClick={() => handleDelete(p.id)} className="text-xs font-bold text-red-600 hover:text-red-800">
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
