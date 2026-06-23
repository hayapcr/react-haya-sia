import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { role, loading, isSupabaseConfigured } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!isSupabaseConfigured) {
    return (
      <div className="p-6 text-red-600">
        Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan
        VITE_SUPABASE_ANON_KEY di file .env.
      </div>
    );
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
