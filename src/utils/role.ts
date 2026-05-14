export type AppRole = "Admin" | "SuperAdmin" | "Manager" | "Employee";

export const normalizeRole = (rawRole?: string | null): AppRole | null => {
  if (!rawRole) return null;

  const value = rawRole.trim().toLowerCase();
  if (value === "admin") return "Admin";
  if (value === "superadmin" || value === "super admin") return "SuperAdmin";
  if (value === "manager") return "Manager";
  if (value === "employee") return "Employee";

  return null;
};

export const isAdminRole = (role?: AppRole | null) =>
  role === "Admin" || role === "SuperAdmin";
