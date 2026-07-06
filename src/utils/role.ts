export type AppRole = "SuperAdmin" | "Admin" | "Manager" | "Employee";

export const normalizeRole = (rawRole?: string | null): AppRole | null => {
  if (!rawRole) return null;

  const value = rawRole.trim().toLowerCase();
  if (value === "superadmin" || value === "super_admin") return "SuperAdmin";
  if (value === "admin") return "Admin";
  if (value === "manager") return "Manager";
  if (value === "employee") return "Employee";

  return null;
};
