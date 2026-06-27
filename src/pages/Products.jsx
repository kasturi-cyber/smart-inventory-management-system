import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    API.get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("❌ Something went wrong!");
      });
  }, []);

  const addProduct = () => {
    API.post("/products", {
  name: name,
  quantity: Number(quantity),
  price: Number(price),
})
    
      .then((response) => {
        setProducts([...products, response.data.product]);
        setName("");
        setQuantity("");
        setPrice("");

    toast.success("✅ Product added successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("❌ Something went wrong!");
      });
  };

  const deleteProduct = (id) => {
    API.delete(`/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        toast.success("🗑️ Product deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("❌ Something went wrong!");
      });
  };

  const editProduct = (product) => {
  setEditingId(product.id);
  setName(product.name);
  setQuantity(product.quantity);
  setPrice(product.price);
  setIsEditing(true);
};

const updateProduct = () => {
  API.put(`/products/${editingId}`, {
    name: name,
    quantity: Number(quantity),
    price: Number(price),
  })
    .then((response) => {
      setProducts(
        products.map((product) =>
          product.id === editingId ? response.data.product : product
        )
      );

      setEditingId(null);
      setIsEditing(false);
      setName("");
      setQuantity("");
      setPrice("");
      toast.success("✏️ Product updated successfully!");
    })
    .catch((error) => {
      console.log(error);
      toast.error("❌ Something went wrong!");
    });
};
const exportToCSV = () => {
  const headers = ["ID", "Name", "Quantity", "Price"];

  const rows = products.map((product) => [
    product.id,
    product.name,
    product.quantity,
    product.price,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "inventory.csv");
  toast.success("📥 Inventory exported successfully!");
};

  return (
    <div className="card">
      <h2>📦 Products</h2>

      {/* Search Bar */}
   <div className="search-container">
  <input
    type="text"
    placeholder="🔍 Search Products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button onClick={exportToCSV}>
    📥 Export Inventory
  </button>
</div>

      {/* Add Product */}
      <div className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
  type="number"
  placeholder="Price"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>

   

        {isEditing ? (
  <button
    onClick={updateProduct}
    style={{ backgroundColor: "#10b981" }}
  >
    💾 Update Product
  </button>
) : (
  <button onClick={addProduct}>
    ➕ Add Product
  </button>
)}
      </div>

      {/* Products Table */}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>

<td>
  {product.quantity === 0 ? (
    <span className="status-badge out-stock">
      ⚫ Out of Stock
    </span>
  ) : product.quantity < 5 ? (
    <span className="status-badge low-stock">
      🔴 Low Stock
    </span>
  ) : (
    <span className="status-badge in-stock">
      🟢 In Stock
    </span>
  )}
</td>

<td>{product.quantity}</td>

<td>₹{product.price}</td>
                <td>
  <button
    onClick={() => editProduct(product)}
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
        `Are you sure you want to delete "${product.name}"?`
      )
    ) {
      deleteProduct(product.id);
    }
  }}
  style={{ backgroundColor: "#ef4444" }}
>
  🗑 Delete
</button>

</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;