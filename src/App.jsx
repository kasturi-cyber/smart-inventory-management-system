//Smart Inventory Managment System
//Module: Product management 
//App.jsx=it is the main page
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import "./styles/App.css";
import "./styles/Layout.css";
import "./styles/Dashboard.css";
import "./styles/Responsive.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
//it tells react to use the dashboard components
import Products from "./pages/Products";
import StockAlert from "./components/StockAlert";
import Suppliers from "./pages/Suppliers";
import Login from "./pages/Login";

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [activePage, setActivePage] = useState("dashboard");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
  return(
  <div className="app-layout">
   <Sidebar
  activePage={activePage}
  setActivePage={setActivePage}
/>

<div className="main-content">

  <div className="navbar">

    <h1>Smart Inventory Management System</h1>

    <button
      className="logout-btn"
      onClick={() => setIsLoggedIn(false)}
    >
      Logout
    </button>

  </div>

     {activePage === "dashboard" && <Dashboard />}

{activePage === "products" && <Products />}

{activePage === "suppliers" && <Suppliers />}

{activePage === "alerts" && <StockAlert />}
    </div>
    <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="light"
/>
  </div>
  );
}

export default App;
//breaking the UI into components is imp concept in react