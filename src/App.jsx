import "./assets/tailwind.css";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./layouts/Sidebar";

function App() {

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
            <div id="layout-wrapper" className="flex flex-row flex-1">
                <Sidebar />
                <div id="main-content" className="flex-1 p-4">
                    <Header />
                    <div className="mt-4">
                        <Dashboard />
                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default App
