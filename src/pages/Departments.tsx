import { useEffect, useState } from "react";
import { Roles } from "../types/roles";
import {
  createDepartment as createDepartmentRequest,
  deleteDepartment as deleteDepartmentRequest,
  fetchDepartments as fetchDepartmentsRequest,
} from "../services/department.service";
import { Trash } from "lucide-react";

interface Role {
  id?: string;
  name: Roles;
}

interface Department {
  id: string;
  name: string;
  manager?: User | null;
}

interface User {
  id: string;
  username: string;
  email: string;
  role?: Role | null;
  isActive: boolean;
  department?: Department;
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    try {
      const list = await fetchDepartmentsRequest();
      setDepartments(list);
      setError("");
    } catch (error) {
      console.error("Error loading departments:", error);
      setDepartments([]);
      setError(error instanceof Error ? error.message : "Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const createDepartment = async () => {
    if (!newDepartment.trim()) return;

    try {
      const dept = await createDepartmentRequest(newDepartment.trim());

      setDepartments((prev) => [...prev, dept]);
      setNewDepartment("");
    } catch (error) {
      console.error("Create department error:", error);
    }
  };

  const deleteDepartment = async (id: string) => {
    if (!confirm("Delete this department?")) return;

    try {
      await deleteDepartmentRequest(id);

      setDepartments((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex flex-col items-center" role="status" aria-live="polite">
          <div
            className="h-10 w-10 rounded-full border-4 border-(--border) border-t-(--accent) animate-spin"
            aria-hidden="true"
          />
          <span className="sr-only">Loading departments</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Departments</h1>
        <p className="text-[13px] text-(--text-muted)">Manage company departments</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Create Department */}
      <div className="ds-card flex flex-wrap gap-3 p-4">
        <input
          type="text"
          placeholder="Department name..."
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          className="h-9 w-64 rounded-lg border border-(--border) bg-(--surface) px-3 text-(--text) placeholder:text-(--text-muted)"
        />

        <button
          onClick={createDepartment}
          className="ds-button ds-button-primary h-8 cursor-pointer px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          disabled={newDepartment.trim() === ""}
        >
          + Add Department
        </button>
      </div>

      {/* Department Table */}
      <div className="ds-card overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[13px]">
          <thead className="bg-(--surface-2)">
            <tr>
              <th className="h-10 px-3 py-2">S.No</th>
              <th className="h-10 px-3 py-2">Department Name</th>
              <th className="h-10 px-3 py-2">Manager</th>
              <th className="h-10 px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept, index) => (
              <tr key={dept.id} className="border-t border-(--border) hover:bg-(--surface-2)">
                <td className="h-10 px-3 py-2">{index + 1}</td>

                <td className="h-10 px-3 py-2 font-medium">{dept.name}</td>

                <td className="h-10 px-3 py-2">{dept.manager?.username || "Unassigned"}</td>

                <td className="h-10 px-3 py-2">
                  <button
                    onClick={() => deleteDepartment(dept.id)}
                    className="inline-flex items-center gap-2 text-(--danger) hover:underline"
                  >
                    <Trash size={14}/>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {departments.length === 0 && (
          <div className="h-10 px-3 py-2 text-center text-(--text-muted)">
            No departments found
          </div>
        )}
      </div>
    </div>
  );
}




