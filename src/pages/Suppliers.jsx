import { useEffect, useState } from "react";
import axios from "axios";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
  axios
    .get("http://127.0.0.1:8000/suppliers")
    .then((response) => {
      setSuppliers(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);
const addSupplier = () => {
  axios
    .post("http://127.0.0.1:8000/suppliers", {
      name: name,
      contact: contact,
    })
    .then((response) => {
      setSuppliers([...suppliers, response.data.supplier]);
      setName("");
      setContact("");
    })
    .catch((error) => {
      console.log(error);
    });
};
const deleteSupplier = (id) => {
  axios
    .delete(`http://127.0.0.1:8000/suppliers/${id}`)
    .then(() => {
      setSuppliers(
        suppliers.filter((supplier) => supplier.id !== id)
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

const editSupplier = (supplier) => {
  setEditingId(supplier.id);
  setName(supplier.name);
  setContact(supplier.contact);
  setIsEditing(true);
};

const updateSupplier = () => {
  axios
    .put(`http://127.0.0.1:8000/suppliers/${editingId}`, {
      name: name,
      contact: contact,
    })
    .then((response) => {
      setSuppliers(
        suppliers.map((supplier) =>
          supplier.id === editingId
            ? response.data.supplier
            : supplier
        )
      );

      setEditingId(null);
      setIsEditing(false);
      setName("");
      setContact("");
    })
    .catch((error) => {
      console.log(error);
    });
};


  return (
    <div>
      <h2 style={{color: "black"}}>Suppliers</h2>
      <div className="product-form">
  <input
    type="text"
    placeholder="Supplier Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Contact"
    value={contact}
    onChange={(e) => setContact(e.target.value)}
  />
{isEditing ? (
  <button
    onClick={updateSupplier}
    style={{ backgroundColor: "#10b981" }}
  >
    💾 Update Supplier
  </button>
) : (
  <button onClick={addSupplier}>
    ➕ Add Supplier
  </button>
)}

</div>
      <table>
        <thead>
  <tr>
    <th>Supplier Name</th>
    <th>Contact</th>
    <th>Action</th>
  </tr>
</thead>

<tbody>
  {suppliers.map((supplier) => (
    <tr key={supplier.id}>
      <td>{supplier.name}</td>
      <td>{supplier.contact}</td>

      <td className="action-cell">
        <button
          onClick={() => editSupplier(supplier)}
          style={{
            backgroundColor: "#10b981",
            marginRight: "10px",
          }}
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => {
  if (
    window.confirm(
      `Are you sure you want to delete "${supplier.name}"?`
    )
  ) {
    deleteSupplier(supplier.id);
  }
}}
          style={{ backgroundColor: "#ef4444" }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    

      
    </div>
  );
}

export default Suppliers;