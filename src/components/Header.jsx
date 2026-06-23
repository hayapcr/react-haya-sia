import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
    const navigate = useNavigate();
    const { profile, signOut } = useAuth();

    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    const displayName = profile?.full_name || profile?.email || "User";

    const handleSignOut = async () => {
        await signOut();
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center p-4">

            {/* Search Bar */}
            <div className="relative w-full max-w-lg">
                <input
                    className="border border-gray-100 p-2 pr-10 bg-white w-full rounded-md outline-none"
                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">

                {/* Time & Date */}
                <div className="text-right">
                    <p className="text-sm font-semibold">{time}</p>
                    <p className="text-xs text-gray-400">{date}</p>
                </div>

                {/* Icons */}
                <div className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">
                        50
                    </span>
                </div>

                <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer">
                    <FcAreaChart />
                </div>

                <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-3 border-l pl-4 border-gray-300">
                    <span>
                        Hello, <b>{displayName}</b>
                    </span>
                    <img
                        className="w-10 h-10 rounded-full"
                        src="https://randomuser.me/api/portraits/women/32.jpg"
                    />
                    <button onClick={handleSignOut} className="text-xs font-bold text-red-500 hover:text-red-700">
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}
