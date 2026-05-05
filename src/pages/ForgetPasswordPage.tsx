import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setMessage("");

    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!newPassword.trim()) {
      newErrors.newPassword = "New Password is required";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    }
    if (newPassword && newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      await resetPassword(normalizedEmail, newPassword);

      setMessage("Password updated successfully! Redirecting to login...");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/signin"), 500);
    } catch (err: any) {
      setErrors({
        apiError: err?.message || "Unable to reset password right now.",
      });
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) text-(--text) px-4">
      <div className="ds-card w-full max-w-md p-3 shadow-(--shadow-strong) md:p-4">
        <div className="mb-4 text-center">
          <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary) text-[12px] font-bold text-white shadow-(--shadow-soft)">
            NE
          </div>
          <h2 className="text-xl font-semibold">Reset Password</h2>
          <p className="text-sm text-(--text-muted)">
            Enter your email and a new password to reset your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-[12px] font-medium text-(--text-muted)">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 h-9 w-full rounded-xl border bg-(--surface) px-3 text-(--text) placeholder:text-(--text-muted) transition focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-(--border) focus:ring-(--accent-strong)"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-medium text-(--text-muted)">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`mt-1 h-9 w-full rounded-xl border bg-(--surface) px-3 text-(--text) placeholder:text-(--text-muted) transition focus:outline-none focus:ring-2 ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-(--border) focus:ring-(--accent-strong)"
              }`}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-medium text-(--text-muted)">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 h-9 w-full rounded-xl border bg-(--surface) px-3 text-(--text) placeholder:text-(--text-muted) transition focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-(--border) focus:ring-(--accent-strong)"
              }`}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.apiError && (
            <p className="text-red-600 text-sm text-center">
              {errors.apiError}
            </p>
          )}
          {message && (
            <p className="text-(--success) text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="ds-button ds-button-primary h-8 w-full px-3 text-sm disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-(--text-muted)">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-(--accent) font-medium cursor-pointer hover:underline"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}
