import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Customers from "../data/Customers.json";

export default function CustomerDetail() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedCustomer = customers.find(
      (item) => item.customerId === id
    );

    if (!selectedCustomer) {
      setError("Customer not found");
      return;
    }

    setCustomer(selectedCustomer);
  }, [id]);

  if (error)
    return <div className="text-red-600 p-4">{error}</div>;

  if (!customer)
    return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f0f9f4] p-8 flex justify-center items-start">
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] max-w-2xl w-full overflow-hidden border border-gray-100">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-400 p-8 text-white">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-black mb-4">
            {customer.customerName.charAt(0)}
          </div>

          <h1 className="text-3xl font-black">
            {customer.customerName}
          </h1>

          <p className="text-white/80 mt-2">
            Customer ID : {customer.customerId}
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-5">
          
          {/* EMAIL */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <p className="text-sm text-gray-500 mb-1">
              Email Address
            </p>

            <h3 className="text-lg font-bold text-gray-800">
              {customer.email}
            </h3>
          </div>

          {/* PHONE */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <p className="text-sm text-gray-500 mb-1">
              Phone Number
            </p>

            <h3 className="text-lg font-bold text-gray-800">
              {customer.phone}
            </h3>
          </div>

          {/* LOYALTY */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <p className="text-sm text-gray-500 mb-3">
              Loyalty Member
            </p>

            <span
              className={`px-5 py-2 rounded-full text-sm font-black tracking-widest
              ${
                customer.loyalty === "Gold"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                  : customer.loyalty === "Silver"
                  ? "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
                  : "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
              }`}
            >
              {customer.loyalty.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}