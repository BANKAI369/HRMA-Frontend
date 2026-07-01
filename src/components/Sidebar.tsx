import {
  BarChart3,
  Home,
  LogOut,
  Mail,
  MessageSquare,
  UserRound,
  Users,
  WalletCards,
  Building2
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
    icon: Mail,
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
    icon: Building2,
    roles: ["Admin"],
    path: "/departments",
  },
  {
    name: "Engage",
    icon: MessageSquare,
    roles: ["Admin", "Manager", "Employee"],
    path: "/dashboard",
  },
  {
    name: "Performance",
    icon: BarChart3,
    roles: ["Manager", "Employee"],
    path: "/projects",
  },
];

export default function Sidebar({ role }: SidebarProps) {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-20 flex-col items-center bg-[#f2f4f6] py-4 text-slate-400">
      <div className="mb-4 p-2 font-['Manrope'] text-[11px] font-black tracking-tight text-[#3525cd]">
        NEST
      </div>

      <nav className="flex flex-1 flex-col items-center gap-2 overflow-y-auto px-2 text-11px">
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
                className={`flex min-h-10 w-16 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold transition ${
                  isActive
                    ? "bg-white text-[#3525cd] shadow-sm"
                    : "hover:bg-white/70 hover:text-[#3525cd]"
                }`}
              >
                <Icon size={18} fill={isActive ? "currentColor" : "none"} />
                <span className="truncate leading-tight">{item.name}</span>
              </button>
            );
          })}
      </nav>

      <button
        type="button"
        onClick={handleLogOut}
        className="mt-3 flex min-h-10 w-16 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold text-red-500 transition hover:bg-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
