import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../Services/authService';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const data = await login(formData);
      alert(data.message);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.data.role);


      navigate("/");
       localStorage.setItem("token", data.token);

localStorage.setItem("role", data.data.role);

localStorage.setItem(
  "user",
  JSON.stringify(data.data)
);

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="min-h-screen mt-24 flex items-center justify-center bg-blue-1000">
      <div className="w-full max-w-md p-4 rounded-xl shadow-lg hover:shadow-xl">
        <h1
          className="text-5xl font-bold text-center mb-12 text-blue-500"
          style={{ fontFamily: "times-new-roman" }}
        >
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-black"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-md p-3 text-black"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-md flex items-center justify-center gap-2"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="flex text-center mt-5 text-white">
          Don't have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;