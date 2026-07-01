import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { acceptInvite, getInvite, type OrganizationInvite } from "../api/inviteApi";
import { useAuth } from "../context/AuthContext";

export default function AcceptInvite() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [invite, setInvite] = useState<OrganizationInvite | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loadInvite = async () => {
      if (!token) {
        setError("Invite token is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getInvite(token);
        setInvite(data);
        setUsername(data.email.split("@")[0] || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invite not found");
      } finally {
        setLoading(false);
      }
    };

    loadInvite();
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Invite token is missing.");
      return;
    }

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      const result = await acceptInvite(token, username, password);
      signIn(result);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept invite");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--surface) text-(--text)">
        Loading invite...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--surface) px-4 text-(--text)">
      <div className="ds-card w-full max-w-md p-4 shadow-(--shadow-strong)">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--primary)">
          Organization Invitation
        </p>
        <h1 className="mt-2 text-2xl font-bold">Join {invite?.organizationId ? "your workspace" : "Nest"}</h1>
        <p className="mt-2 text-sm text-(--text-muted)">
          {invite
            ? `You were invited to ${invite.email} as ${invite.roleName}.`
            : "Accept your invite and set up your account."}
        </p>

        {invite && (
          <div className="mt-4 rounded-xl border border-(--border) bg-(--surface-2) p-3 text-sm">
            <div className="font-semibold">{invite.email}</div>
            <div className="text-(--text-muted)">
              Role: {invite.roleName} · Status: {invite.status}
            </div>
          </div>
        )}

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <input
              className="h-10 w-full rounded-lg border border-(--border) bg-(--surface) px-3 text-(--text)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              className="h-10 w-full rounded-lg border border-(--border) bg-(--surface) px-3 text-(--text)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="h-10 w-full rounded-lg border border-(--border) bg-(--surface) px-3 text-(--text)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-(--danger) bg-(--danger-soft) px-3 py-2 text-sm text-(--danger)">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !invite}
            className="ds-button ds-button-primary h-10 w-full rounded-lg font-semibold disabled:opacity-60"
          >
            {submitting ? "Joining..." : "Join Workspace"}
          </button>
        </form>
      </div>
    </div>
  );
}
