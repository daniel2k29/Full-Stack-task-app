import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Register
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 underline" to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
