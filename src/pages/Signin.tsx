import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/authApi";
import {
  ArrowRight,
  Cloud,
  Eye,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--surface) p-4 text-(--text)">
      <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[40%] rounded-full bg-(--success-soft) opacity-50 blur-[120px]" />
      <div className="absolute -bottom-[10%] -right-[10%] h-[60%] w-[40%] rounded-full bg-(--tertiary-soft) opacity-70 blur-[120px]" />

      <main className="relative z-10 w-full max-w-[480px] lg:mr-[42%]">
        <div className="mb-5 text-center md:pl-4 md:text-left">
          <div className="mb-3 flex items-center justify-center gap-3 md:justify-start">
            <h1 className="font-['Manrope'] text-xl font-extrabold tracking-tight text-(--primary)">
              Nest
            </h1>
          </div>
          <h2 className="mb-2 font-['Manrope'] text-xl font-bold text-(--text)">
            Welcome back
          </h2>
          <p className="text-[13px] font-medium text-(--text-muted)">
            Please enter your details to access your workspace.
          </p>
        </div>

        <div className="ds-card border-(--border) bg-(--surface)/95 p-3 shadow-(--shadow-soft) md:p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                className="block pl-1 text-[12px] font-semibold text-(--text-muted)"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-4 w-4 text-(--text-muted) transition group-focus-within:text-(--primary)" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block h-9 w-full rounded-xl border-0 bg-(--surface-2) pl-10 pr-3 text-(--text) placeholder:text-(--text-muted) transition-all duration-200 focus:bg-(--surface) focus:ring-2 focus:ring-(--primary)/20 ${
                    errors.email ? "ring-2 ring-(--danger)" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="pl-1 text-sm text-(--danger)">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pl-1">
                <label
                  className="block text-[12px] font-semibold text-(--text-muted)"
                  htmlFor="password"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forget-password")}
                  className="text-xs font-bold text-(--primary) transition-colors hover:text-(--primary-hover)"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-4 w-4 text-(--text-muted) transition group-focus-within:text-(--primary)" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block h-9 w-full rounded-xl border-0 bg-(--surface-2) pl-10 pr-10 text-(--text) placeholder:text-(--text-muted) transition-all duration-200 focus:bg-(--surface) focus:ring-2 focus:ring-(--primary)/20 ${
                    errors.password ? "ring-2 ring-(--danger)" : ""
                  }`}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-(--text-muted) hover:text-(--text)"
                  type="button"
                  aria-label="Password visibility"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
              {errors.password && (
                <p className="pl-1 text-sm text-(--danger)">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-(--border) bg-(--surface-2) text-(--primary) focus:ring-(--primary)/20"
              />
              <label
                className="ml-3 cursor-pointer text-sm font-medium text-(--text-muted)"
                htmlFor="remember"
              >
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="ds-button ds-button-primary group h-8 w-full gap-2 rounded-xl px-3 font-['Manrope'] text-sm font-bold shadow-lg disabled:opacity-60"
            >
              <span>{loading ? "Signing in..." : "Sign In to Workspace"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            {errorMessage && (
              <p className="text-center text-sm font-medium text-(--danger)">
                {errorMessage}
              </p>
            )}
          </form>

          <div className="mt-4 border-t border-(--border) pt-4 text-center">
            <p className="text-sm font-medium text-(--text-muted)">
              Don't have an account?
              <span className="ml-1 font-bold text-(--primary)">
                Contact HR Admin
              </span>
            </p>
          </div>
        </div>

      </main>

      <aside className="absolute right-[-5%] top-1/2 hidden aspect-square w-[35%] -translate-y-1/2 rotate-3 overflow-hidden rounded-[64px] shadow-2xl lg:block">
        <img
          alt="Modern minimalist office interior with floor-to-ceiling windows."
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Eba5tMc1Y7tOOd_RHvFd2vkcFMANQAq-dMxW4sHemBsgQYXwr-3YVfGINufrTR8enGvaxoIutGxDXW6QxsvD5KfgCt9UB6B7-iXx0Mx5Fre7HD6nacNsb3eoUvueo0D9TicBrm9ia9_yhRsJ7zHAeBdjqkdLoowZLo8UPxd0_wCdj5Zzaobbh8XM1sktuYYqRRciJqpRO4xw2zY-nBSVMZ-psAxbhZMyizmZc3QLmXFD0uEUj5u8Hj2pwBo3ciXdOYUQpxBJUdUc"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3525cd] to-(--primary) opacity-20 mix-blend-multiply" />
        <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/80 p-4 shadow-xl backdrop-blur-2xl">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-(--primary)">
            Workspace Insight
          </span>
          <p className="font-['Manrope'] text-sm font-bold leading-tight text-(--text)">
            "Nest has redefined how we manage our global workforce with elegant simplicity."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-(--success-soft)" />
            <div>
              <p className="text-sm font-bold">Sarah Chen</p>
              <p className="text-xs text-(--text-muted)">
                VP of People, Innovate Inc.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Signin;
