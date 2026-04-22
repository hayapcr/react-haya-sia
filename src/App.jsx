import "./assets/tailwind.css";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./layouts/Sidebar";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import Error400 from "./pages/Error400";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />
        <div id="main-content" className="flex-1 p-4">
          <Header />
          <div className="mt-4">

            {/* <Dashboard /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />

              {/* ✅ TAMBAHAN ERROR */}
              <Route path="/error-400" element={<Error400 />} />
              <Route path="/error-401" element={<Error401 />} />
              <Route path="/error-403" element={<Error403 />} />

              {/* ❗ HARUS PALING BAWAH */}
              <Route path="*" element={<NotFound />} />
            </Routes>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;