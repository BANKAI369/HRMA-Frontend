import React, { useEffect, useMemo, useState } from "react";
import { fetchLeaveTypes, createLeaveRequest, fetchCurrentUser } from "../services/leave.service";
import { fetchUsers } from "../services/user.service";
import { useAuth } from "../context/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function RequestLeaveForm({ open, onClose, onSuccess }: Props) {
  const { role } = useAuth();
  const [leaveTypes, setLeaveTypes] = useState<Array<any>>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLeaveType, setSelectedLeaveType] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mention UI state
  const [notifyInput, setNotifyInput] = useState("");
  const [suggestions, setSuggestions] = useState<Array<any>>([]);
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [notifyIds, setNotifyIds] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    fetchLeaveTypes()
      .then((types) => {
        setLeaveTypes(types);
        if (types.length && !selectedLeaveType) setSelectedLeaveType(types[0].id || null);
      })
      .catch((err) => setError(err.message || String(err)));
  }, [open]);

  // mention suggestions
  useEffect(() => {
    let active = true;
    if (!mentionQuery) {
      setSuggestions([]);
      return;
    }
    (async () => {
      try {
        const users = await fetchUsers(role as any, mentionQuery);
        if (!active) return;
        setSuggestions(users.slice(0, 8));
      } catch (err) {
        // ignore
      }
    })();
    return () => { active = false; };
  }, [mentionQuery, role]);

  const handleNotifyInput = (value: string) => {
    setNotifyInput(value);
    const atIndex = value.lastIndexOf("@");
    if (atIndex >= 0) {
      const q = value.slice(atIndex + 1).trim();
      // only search when there is at least one char after @
      setMentionQuery(q.length ? q : "");
    } else {
      setMentionQuery(null);
    }
  };

  const selectSuggestion = (user: any) => {
    // replace last @query with @username 
    const atIndex = notifyInput.lastIndexOf("@");
    const before = notifyInput.slice(0, atIndex);
    const after = `@${user.username} `;
    setNotifyInput(before + after);
    setNotifyIds((s) => Array.from(new Set([...s, user.id])));
    setMentionQuery(null);
    setSuggestions([]);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const current = await fetchCurrentUser();
      const userId = current?.id;
      if (!userId) throw new Error("Unable to determine current user");
      if (!selectedLeaveType) throw new Error("Select a leave type");
      // ensure leaveTypeId looks like a UUID (server expects UUID)
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        String(selectedLeaveType)
      );
      if (!isUuid) throw new Error("Select a valid leave type provided by the server");

      // basic date validation
      if (!startDate || !endDate) throw new Error("Start and end dates are required");
      if (new Date(endDate) < new Date(startDate)) throw new Error("End date cannot be before start date");
      const payload = {
        userId,
        leaveTypeId: selectedLeaveType,
        startDate,
        endDate,
        reason: (note || "") + (notifyInput ? `\n\nNotify: ${notifyInput}` : ""),
      };
      await createLeaveRequest(payload);
      setLoading(false);
      onSuccess && onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.message || String(err));
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Request Leave</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col">
              <span className="text-sm text-slate-600">From</span>
              <input required type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="mt-1 rounded border px-2 py-1" />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-slate-600">To</span>
              <input required type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} className="mt-1 rounded border px-2 py-1" />
            </label>
            <label className="col-span-2 flex flex-col">
              <span className="text-sm text-slate-600">Type of leave</span>
              <select value={selectedLeaveType ?? ""} onChange={e=>setSelectedLeaveType(e.target.value)} className="mt-1 rounded border px-2 py-1">
                {leaveTypes.map((t: any) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </label>
            <label className="col-span-2 flex flex-col">
              <span className="text-sm text-slate-600">Note</span>
              <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} className="mt-1 rounded border px-2 py-1" />
            </label>

            <label className="col-span-2 flex flex-col">
              <span className="text-sm text-slate-600">Notify (use @ to mention)</span>
              <input value={notifyInput} onChange={e=>handleNotifyInput(e.target.value)} className="mt-1 rounded border px-2 py-1" placeholder="Type @ to mention someone" />
              {mentionQuery !== null && suggestions.length > 0 && (
                <ul className="mt-1 max-h-40 overflow-auto border rounded bg-white">
                  {suggestions.map((s) => (
                    <li key={s.id} onClick={()=>selectSuggestion(s)} className="px-2 py-1 hover:bg-slate-100 cursor-pointer">{s.username || s.email}</li>
                  ))}
                </ul>
              )}
              {notifyIds.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {notifyIds.map((id) => (
                    <span key={id} className="px-2 py-1 rounded bg-slate-100 text-sm">{id}</span>
                  ))}
                </div>
              )}
            </label>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

          {!leaveTypes.length && (
            <div className="mt-3 text-sm text-yellow-700">No leave types available from server. Contact your administrator.</div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
            <button type="submit" disabled={loading || !leaveTypes.length} className="px-4 py-1 rounded bg-blue-600 text-white">{loading ? "Saving..." : "Request"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
