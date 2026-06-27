import { useEffect, useState } from "react";

function StockAlert() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/stock-alerts")
            .then(res => res.json())
            .then(data => {
              console.log(data);
              setAlerts(data);
    });
    }, []);
    console.log("Alerts length:", alerts.length);

    return (
        <div>

            <h2>⚠ Low Stock Alerts</h2>

            {alerts.length === 0 ? (
                <p>✅ All products are sufficiently stocked.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity Left</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>

                        {alerts.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>₹{product.price}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            )}

        </div>
    );
}

export default StockAlert;