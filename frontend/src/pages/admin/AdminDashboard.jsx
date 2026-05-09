import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Users, CheckCircle, TrendingUp, LogOut } from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    converted: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5001/api/leads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLeads(res.data);

      const converted = res.data.filter((l) => l.status === "converted").length;
      const pending = res.data.filter((l) => l.status === "new").length;

      setStats({
        total: res.data.length,
        converted: converted,
        pending: pending,
      });
    } catch (err) {
      console.error("Error fetching leads:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">LeadFlow CRM Admin</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 font-semibold mb-1">Total Leads</h2>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users size={50} className="text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 font-semibold mb-1">Converted</h2>
                <p className="text-4xl font-bold text-green-600">{stats.converted}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.total > 0
                    ? ((stats.converted / stats.total) * 100).toFixed(1)
                    : 0}
                  % conversion
                </p>
              </div>
              <CheckCircle size={50} className="text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 font-semibold mb-1">Pending</h2>
                <p className="text-4xl font-bold text-orange-600">{stats.pending}</p>
                <p className="text-sm text-gray-500 mt-1">Need follow-up</p>
              </div>
              <TrendingUp size={50} className="text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* View All Leads Button */}
        <button
          onClick={() => navigate("/admin/leads")}
          className="mb-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
        >
          View All Leads →
        </button>

        {/* Recent Leads Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6">Recent Leads</h3>

          {leads.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No leads yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Source</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4 text-gray-900">{lead.name}</td>
                      <td className="py-3 px-4 text-gray-700">{lead.email}</td>
                      <td className="py-3 px-4 text-gray-700">{lead.source}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            lead.status === "converted"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
