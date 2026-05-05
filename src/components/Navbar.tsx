import { Bell, Mail, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const getInitials = (name: string) => {
    const clean = name.trim();
    if (!clean) return "U";
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const { userName } = useAuth();

  return (
    <header className="fixed left-20 right-0 top-0 z-30 flex h-14 items-center justify-between bg-[#f7f9fb] px-4 text-[#191c1e] md:px-5">
      <div className="flex min-w-0 items-center gap-4">
        <span className="font-['Manrope'] text-xl font-black tracking-tight text-[#191c1e]">
          Company Name
        </span>

        <div className="relative hidden w-60 items-center md:flex">
          <Search className="absolute left-3 text-slate-400" size={17} />
          <input
            className="h-9 w-full rounded-lg border-0 bg-white pl-9 pr-3 text-[13px] shadow-sm outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:ring-2 focus:ring-[#4f46e5]/20"
            placeholder="Search anything..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white">
          <Bell size={19} fill="currentColor" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white">
          <Mail size={19} fill="currentColor" />
        </button>
        <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#006a61] text-[12px] font-black text-white shadow-sm">
          {getInitials(userName)}
        </div>
      </div>
    </header>
  );
}
