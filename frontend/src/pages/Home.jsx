import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Users, Zap } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">LeadFlow CRM</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium"
            >
              Submit Lead
            </button>
            <button
              onClick={() => navigate("/admin/login")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Admin Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to LeadFlow CRM
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Manage your leads efficiently with our powerful CRM system
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 text-lg font-semibold"
          >
            Submit Your Lead
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Users size={40} className="text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Lead Management</h3>
            <p className="text-gray-600">
              Efficiently manage and track all your leads in one centralized dashboard
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <BarChart3 size={40} className="text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-gray-600">
              Get real-time insights into your lead conversion rates and metrics
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Zap size={40} className="text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast & Secure</h3>
            <p className="text-gray-600">
              Lightning-fast performance with enterprise-grade security standards
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-indigo-600 text-white rounded-xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6 opacity-90">
            Submit your information and our team will get back to you shortly
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            Submit Lead Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
