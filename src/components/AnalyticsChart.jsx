import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ stats }) {
  const data = [
    { name: "Products", value: stats.total_products },
    { name: "Low Stock", value: stats.low_stock },
    { name: "Suppliers", value: stats.total_suppliers },
    { name: "Out Stock", value: stats.out_of_stock },
  ];

  return (
    <div className="card">
      <h2 className="dashboard-title">📊 Inventory Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#C98C6B"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;