import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/authApi";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const redirectPath = (location.state as { from?: { pathname?: string } } | null)?.from
    ?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const result = await login(email, password);
      signIn(result);
      navigate(redirectPath || "/dashboard", { replace: true });
    } catch (err: any) {
      setErrorMessage(
        err instanceof Error 
          ? err.message 
          : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-(--bg) text-(--text) px-4">
      <div className="w-full max-w-md p-8 bg-(--surface) rounded-3xl border border-(--border) shadow-(--shadow-strong)">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--accent) text-white font-semibold shadow-(--shadow-soft)">
            RB
          </div>

          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-sm text-(--text-muted)">
            Sign in to your RBAC Studio workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-(--surface) text-(--text) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 transition ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-(--border) focus:ring-(--accent-strong)"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-(--surface) text-(--text) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 transition ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-(--border) focus:ring-(--accent-strong)"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}

          <button type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-(--accent) rounded-xl"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {errorMessage && (
            <p className="text-sm text-center text-red-500">{errorMessage}</p>
          )}

          <p className="text-sm text-right mt-2 text-(--text-muted)">
            <span
              onClick={() => navigate("/forget-password")}
              className="text-(--accent) cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
