import {
  Activity,
  Home,
  Inbox,
  Megaphone,
  Network,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppRole } from "../utils/role";

interface SidebarProps {
  role: AppRole;
}

const menuItems = [
  {
    name: "Home",
    icon: Home,
    roles: ["Admin", "Manager", "Employee"],
    path: "/dashboard",
  },
  {
    name: "Me",
    icon: UserRound,
    roles: ["Admin", "Manager", "Employee"],
    path: "/employees",
  },
  {
    name: "Inbox",
    icon: Inbox,
    roles: ["Admin", "Manager", "Employee"],
    path: "/dashboard",
  },
  {
    name: "My Team",
    icon: Users,
    roles: ["Admin", "Manager", "Employee"],
    path: "/employees",
  },
  {
    name: "My Finances",
    icon: WalletCards,
    roles: ["Admin", "Manager", "Employee"],
    path: "/dashboard",
  },
  {
    name: "Org",
    icon: Network,
    roles: ["Admin"],
    path: "/departments",
  },
  {
    name: "Engage",
    icon: Megaphone,
    roles: ["Admin", "Manager", "Employee"],
    path: "/dashboard",
  },
  {
    name: "Performance",
    icon: Activity,
    roles: ["Manager", "Employee"],
    path: "/projects",
  },
];

function getBrandInitials(companyName: string) {
  const clean = companyName.trim();
  if (!clean) return "N";
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Sidebar({ role }: SidebarProps) {
  const { companyName } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const brandName = companyName || "Workspace";

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto bg-[#f2f4f6] text-slate-500">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3525cd] text-white shadow-sm">
            <span className="text-[11px] font-black tracking-wide">
              {getBrandInitials(brandName)}
            </span>
          </div>
          <div>
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#3525cd]">
              {brandName}
            </h2>
            <p className="font-['Manrope'] text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              HR Ecosystem
            </p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-6 pb-6">
        {menuItems
          .filter((item) => item.roles.includes(role))
          .map((item) => {
            const Icon = item.icon;
            const isActive =
              (location.pathname === "/dashboard" && item.name === "Home") ||
              (location.pathname === "/employees" && item.name === "Me") ||
              (location.pathname === "/departments" && item.name === "Org") ||
              (location.pathname === "/projects" && item.name === "Performance");

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 text-left font-['Manrope'] text-sm font-semibold tracking-tight transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#3525cd] shadow-sm"
                    : "text-slate-500 hover:bg-white/60 hover:text-[#3525cd]"
                }`}
              >
                <Icon size={18} fill={isActive ? "currentColor" : "none"} />
                <span>{item.name}</span>
              </button>
            );
          })}
      </nav>

    </aside>
  );
}
