import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTruck,
  FaExclamationTriangle,
  FaCog,
} from "react-icons/fa";

function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">
      <div className="logo">
  <div className="logo-icon">📦</div>
  <h2>Smart Inventory</h2>
  <p>Management System</p>
</div>

      <ul>

  <li 
     className={activePage === "dashboard" ? "active" : ""}
     onClick={() => setActivePage("dashboard")}>
    <FaTachometerAlt /> Dashboard
  </li>

  <li 
     className={activePage === "products" ? "active" : ""}
     onClick={() => setActivePage("products")}>
    <FaBoxOpen /> Products
  </li>

  <li 
   className={activePage === "suppliers" ? "active" : ""}
  onClick={() => setActivePage("suppliers")}>
    <FaTruck /> Suppliers
  </li>

<li
  className={activePage === "alerts" ? "active" : ""}
  onClick={() => setActivePage("alerts")}
>
    <FaExclamationTriangle /> Alerts
  </li>

</ul>
    </div>
  );
}

export default Sidebar;