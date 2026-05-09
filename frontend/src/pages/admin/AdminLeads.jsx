import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Edit2, Trash2, Check } from "lucide-react";

function AdminLeads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `http://localhost:5001/api/leads/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLeads();
      alert("✅ Lead status updated!");
    } catch (err) {
      console.error("Error updating lead:", err);
      alert("❌ Failed to update lead");
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:5001/api/leads/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchLeads();
        alert("✅ Lead deleted successfully!");
      } catch (err) {
        console.error("Error deleting lead:", err);
        alert("❌ Failed to delete lead");
      }
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Manage Leads</h1>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-600"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6">All Leads ({filteredLeads.length})</h3>

          {filteredLeads.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No leads found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">#</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Source</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.map((lead, index) => (
                    <tr
                      key={lead.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4 text-gray-700 font-semibold">
                        {index + 1}
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-medium">
                        {lead.name}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{lead.email}</td>
                      <td className="py-4 px-4 text-gray-700">{lead.source}</td>
                      <td className="py-4 px-4">
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
                      <td className="py-4 px-4 flex gap-2">
                        {lead.status !== "converted" && (
                          <button
                            onClick={() => updateStatus(lead.id, "converted")}
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition flex items-center gap-1"
                            title="Mark as converted"
                          >
                            <Check size={16} />
                            Convert
                          </button>
                        )}

                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                          title="Delete lead"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
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

export default AdminLeads;
