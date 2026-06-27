//Dashboard.jsx=it is a component(a reusable piece of UI)
import CountUp from "react-countup";
import AnalyticsChart from "../components/AnalyticsChart";
import { useState, useEffect } from "react";
import {
  FaBoxOpen,
  FaExclamationTriangle,
  FaTruck,
  FaTimesCircle,
  FaRupeeSign
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
  total_products: 0,
  total_suppliers: 0,
  low_stock: 0,
  out_of_stock: 0,
  inventory_value: 0,
});

useEffect(() => {
  fetch("http://127.0.0.1:8000/dashboard-stats")
    .then((res) => res.json())
    .then((data) => setStats(data))
    .catch((err) => console.log(err));
}, []);

const hour = new Date().getHours();

let greeting = "Good Evening 🌙";

if (hour < 12) {
  greeting = "Good Morning ☀️";
} else if (hour < 18) {
  greeting = "Good Afternoon 🌤️";
}

return (
  <div>
    <div className="welcome-banner">
      <h2>{greeting}, Admin 👋</h2>
      <p>Manage products, suppliers, and inventory efficiently.</p>
    </div>

    <p className="dashboard-subtitle">
      Here's an overview of your inventory.
    </p>

    <div className="dashboard-cards">

      <div className="stat-card products-card">
        <FaBoxOpen className="card-icon" />
        <h2>{stats.total_products}</h2>
        <p>Total Products</p>
      </div>

    

    <div className="stat-card stock-card">
  <FaExclamationTriangle className="card-icon" />
  <h2>{stats.low_stock}</h2>
  <p>Low Stock Items</p>
</div>

<div className="stat-card supplier-card">
  <FaTruck className="card-icon" />
  <h2>{stats.total_suppliers}</h2>
  <p>Suppliers</p>
</div>

<div className="stat-card out-card">
  <FaTimesCircle className="card-icon" />
  <h2>{stats.out_of_stock}</h2>
  <p>Out Of Stock</p>
</div>

<div className="stat-card value-card">
  <FaRupeeSign className="card-icon" />
  <h2>₹{stats.inventory_value}</h2>
  <p>Inventory Value</p>
</div>

<AnalyticsChart stats={stats} />

</div>
  </div>
);
}



export default Dashboard;