import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineError } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
    const navigate = useNavigate();
    const { isSupabaseConfigured } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        fullName: "",
        role: "customer",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (evt) => {
        const { id, value } = evt.target;
        setDataForm({
            ...dataForm,
            [id]: value,
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!isSupabaseConfigured || !supabase) {
            setError("Supabase belum dikonfigurasi. Isi file .env terlebih dahulu.");
            setLoading(false);
            return;
        }

        if (!dataForm.fullName.trim()) {
            setError("Nama lengkap wajib diisi.");
            setLoading(false);
            return;
        }

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan konfirmasi password tidak sama.");
            setLoading(false);
            return;
        }

        const { data, error: registerError } = await supabase.auth.signUp({
            email: dataForm.email,
            password: dataForm.password,
            options: {
                data: {
                    full_name: dataForm.fullName,
                    role: dataForm.role,
                },
            },
        });

        if (registerError) {
            setError(registerError.message);
            setLoading(false);
            return;
        }

        if (data.session) {
            navigate("/");
        } else {
            setSuccess("Registrasi berhasil. Silakan cek email atau login jika akun sudah aktif.");
            setDataForm({
                fullName: "",
                role: "customer",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setTimeout(() => navigate("/login"), 1500);
        }

        setLoading(false);
    };

    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <MdOutlineError className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
            <AiOutlineLoading3Quarters className="me-2 animate-spin" />
            Mohon Tunggu...
        </div>
    ) : null;

    const successInfo = success ? (
        <div className="bg-green-200 mb-5 p-5 text-sm font-light text-gray-600 rounded">
            {success}
        </div>
    ) : null;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account âœ¨
            </h2>

            {errorInfo}

            {successInfo}

            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={dataForm.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="Your full name"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Role
                    </label>
                    <select
                        id="role"
                        value={dataForm.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    )
}
