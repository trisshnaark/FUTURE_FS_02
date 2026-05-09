import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Send } from "lucide-react";

function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "Website",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim() || !form.email.trim()) {
      setError("❌ Please fill in all required fields (Name & Email)");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("❌ Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:5002/api/leads", form);
      console.log("✅ Lead submitted successfully:", response.data);
      console.log("Form data sent:", form);
      setSuccess(true);
      setError("");
      
      // Reset form
      setForm({
        name: "",
        email: "",
        source: "Website",
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("❌ Error details:", err.response?.data || err.message);
      console.error("Request was:", form);
      setError(err.response?.data?.message || err.response?.data?.error || "❌ Failed to submit lead. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">LeadFlow CRM</h1>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </nav>

      <div className="min-h-[calc(100vh-80px)] flex justify-center items-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            Submit Your Lead
          </h1>
          <p className="text-gray-600 mb-8">
            Fill out the form below and we'll get in touch soon
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              ✅ Lead submitted successfully! Thank you for reaching out.
            </div>
          )}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border-2 border-gray-300 p-4 mb-5 rounded-lg focus:outline-none focus:border-indigo-600 transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border-2 border-gray-300 p-4 mb-5 rounded-lg focus:outline-none focus:border-indigo-600 transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="How did you hear about us?"
            className="w-full border-2 border-gray-300 p-4 mb-6 rounded-lg focus:outline-none focus:border-indigo-600 transition"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-4 rounded-lg font-bold hover:bg-indigo-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
          >
            <Send size={20} />
            {loading ? "Submitting..." : "Submit Lead"}
          </button>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Have credentials? <span className="text-indigo-600 cursor-pointer hover:underline" onClick={() => navigate("/admin/login")}>Admin Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Contact;