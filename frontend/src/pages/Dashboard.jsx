import { useEffect, useState } from "react";
import axios from "axios";
import { Users, CheckCircle } from "lucide-react";
import API_BASE_URL from "../api";

function Dashboard() {

  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_BASE_URL}/leads`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setLeads(res.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_BASE_URL}/leads/${id}`,
        { status },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      fetchLeads();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        CRM Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <Users size={40} />
          <h2 className="text-2xl mt-3">
            Total Leads
          </h2>
          <p className="text-4xl font-bold">
            {leads.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <CheckCircle size={40} />
          <h2 className="text-2xl mt-3">
            Converted
          </h2>

          <p className="text-4xl font-bold">
            {
              leads.filter(
                (lead) =>
                  lead.status?.toLowerCase() === "converted"
              ).length
            }
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr
                key={lead.id}
                className="text-center border-b h-16"
              >

                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.source}</td>
                <td>{lead.status}</td>

                <td>
                  {lead.status?.toLowerCase() !== "converted" && (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() =>
                        updateStatus(
                          lead.id,
                          "converted"
                        )
                      }
                    >
                      Convert
                    </button>
                  )}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Dashboard;
