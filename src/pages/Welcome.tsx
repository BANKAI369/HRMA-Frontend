import { useMemo } from "react";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  Inbox,
  Layers3,
  Link2,
  Megaphone,
  Monitor,
  Network,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRoleWorkspace } from "../data/roleWorkspace";

const navItems = [
  { label: "Home", icon: Home, path: "/dashboard" },
  { label: "Me", icon: Users, path: "/employees" },
  { label: "Inbox", icon: Inbox, path: "/dashboard" },
  { label: "My Team", icon: Users, path: "/employees" },
  { label: "My Finances", icon: WalletCards, path: "/dashboard" },
  { label: "Org", icon: Network, path: "/departments" },
  { label: "Engage", icon: Megaphone, path: "/dashboard" },
  { label: "Performance", icon: Activity, path: "/projects" },
];

const onboardingItems = [
  {
    title: "About",
    icon: PenTool,
    detail: "Add a short intro so teammates know what you do.",
  },
  {
    title: "What I love about my job?",
    icon: Sparkles,
    detail: "Share what motivates you and what you enjoy most.",
  },
  {
    title: "My interests and hobbies",
    icon: ClipboardList,
    detail: "Help people discover common interests and connect faster.",
  },
];

const exploreCards = [
  { label: "Finance", icon: WalletCards },
  { label: "Leaves", icon: CalendarDays },
  { label: "Attendance", icon: Monitor },
  { label: "Inbox", icon: Inbox },
  { label: "Documents", icon: FileText },
  { label: "Goals", icon: Layers3 },
  { label: "Expenses", icon: FileText },
  { label: "Engage", icon: Megaphone },
];

export default function Welcome() {
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const workspace = getRoleWorkspace(role);

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }).format(new Date()),
    []
  );

  return (
    <div className="font-['Inter'] text-[#191c1e]">
      <div className="mb-4 border-b border-[#e0e3e5]">
        <nav className="flex gap-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className={`border-b-2 py-3 text-[13px] transition ${
              location.pathname === "/dashboard"
                ? "border-[#191c1e] font-semibold text-[#191c1e]"
                : "border-transparent font-medium text-slate-500 hover:text-[#191c1e]"
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/welcome")}
            className={`border-b-2 py-3 text-[13px] transition ${
              location.pathname === "/welcome"
                ? "border-[#191c1e] font-bold text-[#191c1e]"
                : "border-transparent font-medium text-slate-500 hover:text-[#191c1e]"
            }`}
          >
            Welcome
          </button>
        </nav>
      </div>

      <div className="space-y-10">
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#3525cd] to-[#5c4cfc] p-6 text-white shadow-xl shadow-[#3525cd]/20 md:p-8">
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  alt="Workspace user"
                  className="h-24 w-24 rounded-full border-4 border-white/20 object-cover shadow-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIL7yA9mxF7kHQd_4rEf0LCpXY3RJDn8AiEqf7XDfb8iIvsE0_7h_jlBObuY7l8SLJNheeUsJuBwQOmQgiyOe8dGWL8QtO3pqCWPQYwo3Lx0s3IxZNGJqPSmjeCq2xOq6nYASfzth7oYyDikWI8cnGkmQq1D73yzBfauCdMi2Y9nWI_oFJylpi67VD_3-ayAJvX5jn51OkfGtUzb8Wo5ZLjjJH71YSiVgaOH0MmQvgjr9eMYW1xOZrBY04--NmAg6FqgSFIMd8NoWN"
                />
                <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#22c55e]">
                  <ShieldCheck size={14} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="font-['Manrope'] text-3xl font-black">
                  Workspace
                </h1>
                <p className="text-[13px] font-medium text-white/80">
                  {workspace.label} - {workspace.welcomeSubtitle}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-center md:text-right">
              <div className="inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <ShieldCheck size={18} />
                <span className="text-[13px] font-bold">Profile completed successfully</span>
              </div>
              <button
                type="button"
                className="scale-98 rounded-xl bg-white px-6 py-3 text-[13px] font-bold text-[#3525cd] shadow-sm transition hover:bg-[#f7f9fb]"
              >
                Go to My Profile
              </button>
            </div>
          </div>

          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#86f2e4]/10 blur-2xl" />
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c7c4d8]/30 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#c7c4d8]/20 p-4 md:p-5">
            <div>
              <h2 className="font-['Manrope'] text-[16px] font-black text-[#191c1e]">
                {workspace.welcomeTitle}
              </h2>
              <p className="mt-1 text-[13px] font-medium text-[#464555]">
                {workspace.welcomeSubtitle}
              </p>
            </div>
            <span className="rounded-full bg-[#e2dfff] px-3 py-1 text-[13px] font-bold text-[#3525cd]">
              0/3
            </span>
          </div>

          <div className="divide-y divide-[#c7c4d8]/20">
            {onboardingItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="p-4 transition hover:bg-[#f7f9fb] md:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e2dfff] font-bold text-[#3525cd]">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-['Manrope'] text-[13px] font-bold">{item.title}</h3>
                        <p className="mt-1 text-[13px] text-[#464555]">{item.detail}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-[13px] font-bold text-[#3525cd] hover:underline"
                    >
                      <Icon size={18} />
                      Add Response
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c7c4d8]/30 bg-white shadow-sm">
          <div className="p-6 md:p-8">
            <h2 className="font-['Manrope'] text-[16px] font-black text-[#191c1e]">
              Explore your workspace
            </h2>
            <p className="mt-1 text-[13px] font-medium text-[#464555]">
              {workspace.highlight}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4 md:gap-6 md:p-8">
            {[...workspace.primaryCards, ...workspace.secondaryCards].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  type="button"
                  className="group flex flex-col items-center justify-center rounded-lg border border-transparent bg-[#eceef0] p-6 transition duration-300 hover:border-[#3525cd]/20 hover:bg-[#3525cd]/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3525cd]/10 text-[#3525cd] transition-transform group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <span className="mt-3 text-[13px] font-bold text-[#191c1e] group-hover:text-[#3525cd]">
                    {item.title}
                  </span>
                  <p className="mt-2 text-center text-[12px] text-[#464555]">
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-[#c7c4d8]/30 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3525cd]/10 text-[#3525cd]">
                <Search size={20} />
              </div>
              <div>
                <h3 className="font-['Manrope'] text-[16px] font-black text-[#191c1e]">
                  Quick access
                </h3>
                <p className="text-[13px] text-[#464555]">{today}</p>
              </div>
            </div>
            <ul className="space-y-3 text-[13px] text-[#464555]">
              <li className="flex gap-2">
                <ChevronRight size={16} className="mt-0.5 shrink-0 text-[#3525cd]" />
                Finish your {role || "workspace"} profile today.
              </li>
              <li className="flex gap-2">
                <ChevronRight size={16} className="mt-0.5 shrink-0 text-[#3525cd]" />
                Reach out if you need access to any tools.
              </li>
              <li className="flex gap-2">
                <ChevronRight size={16} className="mt-0.5 shrink-0 text-[#3525cd]" />
                Say hello to your teammates and get settled in.
              </li>
            </ul>
          </article>

          <article className="rounded-xl border border-[#c7c4d8]/30 bg-[#f7f9fb] p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3525cd]/10 text-[#3525cd]">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-['Manrope'] text-[16px] font-black text-[#191c1e]">
                  First week plan
                </h3>
                <p className="text-[13px] text-[#464555]">A simple path to get started</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e2dfff] font-bold text-[#3525cd]">
                    1
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#191c1e]">Welcome session</p>
                    <p className="text-[13px] text-[#464555]">Meet your manager and team</p>
                  </div>
                </div>
                <Link2 size={16} className="text-[#3525cd]" />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e2dfff] font-bold text-[#3525cd]">
                    2
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#191c1e]">Policy walkthrough</p>
                    <p className="text-[13px] text-[#464555]">Review handbook and benefits</p>
                  </div>
                </div>
                <Link2 size={16} className="text-[#3525cd]" />
              </div>
            </div>
          </article>
        </section>

      </div>
    </div>
  );
}
