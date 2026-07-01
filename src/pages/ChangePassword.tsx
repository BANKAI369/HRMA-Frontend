import { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-[#191c1e]">Change Password</h1>
        <p className="text-[13px] text-(--text-muted)">
          Update your account password when the backend endpoint is ready.
        </p>
      </div>

      <div className="ds-card max-w-xl p-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="block text-[12px] font-semibold text-(--text-muted)">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="h-9 w-full rounded-lg border border-(--border) bg-(--surface) px-3 text-[#191c1e]"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[12px] font-semibold text-(--text-muted)">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-9 w-full rounded-lg border border-(--border) bg-(--surface) px-3 text-[#191c1e]"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[12px] font-semibold text-(--text-muted)">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-9 w-full rounded-lg border border-(--border) bg-(--surface) px-3 text-[#191c1e]"
            />
          </div>

          <button
            type="button"
            className="ds-button ds-button-primary h-8 px-4 text-sm"
            onClick={() => {
              window.alert("Change password backend integration is not wired yet.");
            }}
          >
            Save Password
          </button>
        </div>
      </div>
    </div>
  );
}
