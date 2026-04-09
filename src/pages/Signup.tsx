import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) newErrors.username = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (password.trim() && password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const result = await register(username, email, password);
      signIn(result);
      setMessage("Account created successfully.");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) text-(--text) px-4">
      <div className="w-full max-w-md bg-(--surface) border border-(--border) shadow-(--shadow-strong) rounded-3xl p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--accent) text-white font-semibold shadow-(--shadow-soft)">
            RB
          </div>
          <h2 className="text-3xl font-semibold">Create your account</h2>
          <p className="text-sm text-(--text-muted)">
            Start managing teams and access in minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl bg-(--surface) text-(--text) placeholder:text-(--text-muted) focus:ring-2 focus:outline-none transition ${
                errors.username
                  ? "border-red-500 focus:ring-red-400"
                  : "border-(--border) focus:ring-(--accent-strong)"
              }`}
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl bg-(--surface) text-(--text) placeholder:text-(--text-muted) focus:ring-2 focus:outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-(--border) focus:ring-(--accent-strong)"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl bg-(--surface) text-(--text) placeholder:text-(--text-muted) focus:ring-2 focus:outline-none transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-(--border) focus:ring-(--accent-strong)"
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-(--accent) text-white font-semibold hover:bg-(--accent-strong) active:scale-95 transition duration-200"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.toLowerCase().includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-(--text-muted)">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-(--accent) font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
