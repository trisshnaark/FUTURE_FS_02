import { useEffect, useState } from "react";
import axios from "axios";
import { Users, CheckCircle } from "lucide-react";

function Dashboard() {

  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.get(
      "http://localhost:5001/api/leads"
    );

    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {

    await axios.put(
      `http://localhost:5002/api/leads/${id}`,
      { status }
    );

    fetchLeads();
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
                  lead.status === "converted"
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
