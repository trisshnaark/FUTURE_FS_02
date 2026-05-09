import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5001/api/admin/login",
        credentials
      );

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        alert("✅ Login Successful!");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <LogIn size={40} className="mx-auto text-indigo-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Manage your CRM leads securely</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border-2 border-gray-300 p-4 mb-5 rounded-lg focus:outline-none focus:border-indigo-600 transition"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-gray-300 p-4 mb-6 rounded-lg focus:outline-none focus:border-indigo-600 transition"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-4 rounded-lg font-bold hover:bg-indigo-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Back to <span className="text-indigo-600 cursor-pointer hover:underline" onClick={() => navigate("/")}>Home</span>
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-6 text-sm text-gray-700">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Email: admin@leadflow.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
