import { MdDashboard } from "react-icons/md";
import { FaList, FaHeadphones, FaExclamationTriangle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
    ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  return (
    <div className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
      {/* Logo */}
      <div className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900">
          Sedap<b className="text-hijau">.</b>
        </span>

        <span className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* Menu */}
      <div className="mt-10">
        <ul className="space-y-3">
          {/* Dashboard */}
          <li>
            <NavLink to="/" className={menuClass}>
              <MdDashboard className="mr-4 text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Orders */}
          <li>
            <NavLink to="/orders" className={menuClass}>
              <FaList className="mr-4 text-xl" />
              <span>Orders</span>
            </NavLink>
          </li>

          {/* Customers */}
          <li>
            <NavLink to="/customers" className={menuClass}>
              <FaHeadphones className="mr-4 text-xl" />
              <span>Customers</span>
            </NavLink>
          </li>

          {/* Products */}
          <li>
            <NavLink to="/products" className={menuClass}>
              <FaBox className="mr-4 text-xl" />
              <span>Products</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/components"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <FaPuzzlePiece className="mr-4 text-xl" />
              <span>Components</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fitur-xyz"
              className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
            >
              <FaPuzzlePiece className="mr-4 text-xl rotate-45" />
              <span>Fitur XYZ</span>
            </NavLink>
          </li>

          {/* ===================== */}
          {/* ERROR MENU */}
          {/* ===================== */}

          <li className="mt-6 text-gray-400 text-sm font-semibold">
            Error Pages
          </li>

          <li>
            <NavLink to="/error-400" className={menuClass}>
              <FaExclamationTriangle className="mr-4 text-xl" />
              <span>Error 400</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/error-401" className={menuClass}>
              <FaExclamationTriangle className="mr-4 text-xl" />
              <span>Error 401</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/error-403" className={menuClass}>
              <FaExclamationTriangle className="mr-4 text-xl" />
              <span>Error 403</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <div className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
          <div className="text-white text-sm">
            <span>Please organize your menus through button below!</span>

            <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2">
              <span className="text-gray-600 flex items-center">Add Menus</span>
            </div>
          </div>

          <img
            className="w-20 rounded-full"
            src="https://randomuser.me/api/portraits/women/32.jpg"
            alt="avatar"
          />
        </div>

        <span className="font-bold text-gray-400">
          Sedap Restaurant Admin Dashboard
        </span>

        <p className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}
