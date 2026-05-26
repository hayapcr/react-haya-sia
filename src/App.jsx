import "./assets/tailwind.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import React from "react";
import { Suspense } from "react";
import Loading from "./components/Loading";
import Components from "./pages/Components";

function App() {
  const Dashboard = React.lazy(() => import("./pages/Dashboard"))
  const Orders = React.lazy(() => import("./pages/Orders"))
  const Customers = React.lazy(() => import("./pages/Customers"))
  const NotFound = React.lazy(() => import("./pages/NotFound"))
  const Error400 = React.lazy(() => import("./pages/Error400"))
  const Error401 = React.lazy(() => import("./pages/Error401"))
  const Error403 = React.lazy(() => import("./pages/Error403"))
  const Login = React.lazy(() => import("./pages/auth/Login"))
  const Register = React.lazy(() => import("./pages/auth/Register"))
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
  const AuthLayout = React.lazy(() => import("./layouts/AuthLayout")) 
  const Product = React.lazy(() => import("./pages/Products"))
  const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))
  const CustomersDetail = React.lazy(() => import("./pages/CustomersDetail"))
  
  const FiturXyz = React.lazy(() => import("./pages/auth/FiturXyz"))

  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/error-400" element={<Error400 />} />
        <Route path="/error-401" element={<Error401 />} />
        <Route path="/error-403" element={<Error403 />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/customers/:id" element={<CustomersDetail />} />
        <Route path="/components" element={<Components />} />
        
        <Route path="/fitur-xyz" element={<FiturXyz />} />
      </Route>

      <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
