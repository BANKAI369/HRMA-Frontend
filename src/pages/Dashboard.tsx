import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ChevronRight,
  FileText,
  Heart,
  Megaphone,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import {
  DashboardMetrics,
  fetchDashboardMetrics,
} from "../services/dashboard.service";
import { useAuth } from "../context/AuthContext";
import {
  dashboardActions,
  dashboardActivities,
  dashboardAnnouncements,
  dashboardHelpCard,
  dashboardHoliday,
  dashboardLeaveBalances,
  dashboardMilestones,
  dashboardPostTools,
  dashboardQuickNumbers,
  fallbackRecentUsers,
} from "../data/dashboardMockData";

interface Role {
  name: string;
}

interface User {
  id?: string;
  username?: string;
  email?: string;
  role?: Role | string | null;
  isActive?: boolean;
  createdAt?: string;
  department?: {
    id: string;
    name: string;
  } | null;
}

function initials(name = "User") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [currentDepartment, setCurrentDepartment] = useState<string | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { role, userName } = useAuth();
  const HelpIcon = dashboardHelpCard.icon;

  const loadCounts = async () => {
    try {
      setLoading(true);
      setError("");

      const metrics: DashboardMetrics = await fetchDashboardMetrics();

      setEmployeeCount(metrics.employeeCount ?? 0);
      setManagerCount(metrics.managerCount ?? 0);
      setDepartmentCount(metrics.departmentCount ?? 0);
      setTotalUsers(metrics.totalUsers ?? 0);
      setActiveUsers(metrics.activeUsers ?? 0);
      setInactiveUsers(metrics.inactiveUsers ?? 0);
      setCurrentDepartment(metrics.currentDepartment ?? null);
      setRecentUsers(Array.isArray(metrics.recentUsers) ? metrics.recentUsers : []);
    } catch (err) {
      setEmployeeCount(0);
      setManagerCount(0);
      setDepartmentCount(0);
      setTotalUsers(0);
      setActiveUsers(0);
      setInactiveUsers(0);
      setCurrentDepartment(null);
      setRecentUsers([]);
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, [role]);

  const people = recentUsers.length > 0 ? recentUsers : fallbackRecentUsers;

  const today = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }).format(new Date());
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="flex flex-col items-center" role="status" aria-live="polite">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-(--border) border-t-(--accent)"
            aria-hidden="true"
          />
          <span className="sr-only">Loading dashboard</span>
        </div>
      </div>
    );
  }

  return (
    <div className="font-['Inter'] text-[#191c1e]">
      <section className="bg-[#f7f9fb]">
        <div className="border-b border-[#e0e3e5]">
          <nav className="flex gap-4">
            <button className="border-b-2 border-[#3525cd] py-3 text-sm font-bold text-[#3525cd]">
              Dashboard
            </button>
            <button className="border-b-2 border-transparent py-3 text-sm font-semibold text-slate-500 transition hover:text-[#3525cd]">
              Welcome
            </button>
          </nav>
        </div>

        <div className="grid grid-cols-12 gap-4 pt-4">
          <div className="col-span-12 space-y-4 xl:col-span-8">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#006a61]">
                  Good Morning, {userName || "Sarah"}
                </p>
                <h1 className="font-['Manrope'] text-xl font-extrabold tracking-tight text-[#191c1e]">
                  Organization Overview
                </h1>
                {role === "Manager" && currentDepartment && (
                  <p className="mt-2 text-sm font-semibold text-[#3525cd]">
                    Department: {currentDepartment}
                  </p>
                )}
              </div>
              <div className="flex w-fit rounded-xl bg-[#f2f4f6] p-1">
                <button className="h-8 rounded-lg bg-white px-3 text-sm font-bold text-[#3525cd] shadow-sm">
                  Organization
                </button>
                <button className="h-8 rounded-lg px-3 text-sm font-semibold text-slate-500 transition hover:text-[#3525cd]">
                  Department
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <div className="rounded-xl bg-white p-3 shadow-sm md:p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e2dfff] text-[12px] font-bold text-[#3525cd]">
                  {initials(userName || "Sarah Chen")}
                </div>
                <div className="min-w-0 flex-1">
                  <textarea
                    className="w-full resize-none border-0 bg-transparent p-0 text-[13px] outline-none placeholder:text-slate-300 focus:ring-0"
                    placeholder="Share something with the team..."
                    rows={2}
                  />
                  <div className="mt-3 flex flex-col gap-3 border-t border-[#f2f4f6] pt-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-3">
                      {dashboardPostTools.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.label}
                            className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 transition hover:text-[#3525cd]"
                          >
                            <Icon size={16} />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                    <button className="h-8 rounded-lg bg-[#3525cd] px-3 text-sm font-bold text-white shadow-lg shadow-[#3525cd]/20 transition hover:scale-[1.02]">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-['Manrope'] text-sm font-bold">Announcements</h2>
                <button className="text-sm font-semibold text-[#3525cd] hover:underline">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {dashboardAnnouncements.map((announcement) =>
                  announcement.variant === "primary" ? (
                    <article
                      key={announcement.title}
                      className="group relative overflow-hidden rounded-xl bg-[#3525cd] p-3 text-white md:p-4"
                    >
                      <Megaphone
                        className="absolute -bottom-5 -right-5 opacity-10 transition group-hover:scale-110"
                        size={84}
                      />
                      <span className="mb-3 inline-block rounded bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
                        {announcement.badge}
                      </span>
                      <h3 className="mb-2 text-sm font-bold leading-tight">
                        {announcement.title}
                      </h3>
                      <p className="mb-3 text-[13px] text-white/80">
                        {announcement.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <Calendar size={14} />
                        {announcement.meta}
                      </div>
                    </article>
                  ) : (
                    <article
                      key={announcement.title}
                      className="rounded-xl border-l-4 border-[#5c00ca] bg-[#e6e8ea] p-3 md:p-4"
                    >
                      <span className="mb-3 inline-block rounded bg-[#5c00ca]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#5c00ca]">
                        {announcement.badge}
                      </span>
                      <h3 className="mb-2 text-sm font-bold leading-tight text-[#191c1e]">
                        {announcement.title}
                      </h3>
                      <p className="mb-3 text-[13px] text-slate-600">
                        {announcement.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <FileText size={14} />
                        {announcement.meta}
                      </div>
                    </article>
                  )
                )}
              </div>
            </section>

            <section className="rounded-xl bg-white p-3 shadow-sm md:p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="space-y-3 border-[#eceef0] md:border-r md:pr-4">
                  <h2 className="font-['Manrope'] text-sm font-bold">
                    Upcoming Birthdays
                  </h2>
                  <div className="space-y-3">
                    {people.slice(0, 2).map((person, index) => (
                      <div key={person.id || person.username} className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                            index === 0
                              ? "bg-[#86f2e4] text-[#006f66]"
                              : "bg-[#7531e6] text-[#e4d4ff]"
                          }`}
                        >
                          {initials(person.username)}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold">{person.username || "Team Member"}</p>
                          <p className="text-[10px] text-slate-500">Tomorrow</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h2 className="mb-3 font-['Manrope'] text-sm font-bold">
                    Milestones & Welcomes
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {dashboardMilestones.map((milestone, index) => {
                      const Icon = milestone.icon;
                      const person = index === 0 ? people[2] : people[0];

                      return (
                        <div
                          key={milestone.label}
                          className={`flex items-center gap-3 rounded-xl p-3 ${milestone.cardClassName}`}
                        >
                          <div className={`rounded-lg bg-white p-2 ${milestone.iconClassName}`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <p
                              className={`text-xs font-semibold uppercase ${milestone.labelClassName}`}
                            >
                              {milestone.label}
                            </p>
                            <p className="font-bold text-[#191c1e]">
                              {person?.username || milestone.fallbackName}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-['Manrope'] text-sm font-bold">Recent Activity</h2>
              {dashboardActivities.map((activity) => (
                <article
                  key={`${activity.author}-${activity.time}`}
                  className="rounded-xl border border-transparent bg-white p-3 shadow-sm transition hover:border-[#c7c4d8]/50 md:p-4"
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        activity.variant === "praise"
                          ? "bg-[#86f2e4] text-[#006f66]"
                          : "bg-[#c3c0ff] text-[#0f0069]"
                      }`}
                    >
                      {activity.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-bold">{activity.author}</span>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                      {activity.variant === "praise" ? (
                        <div className="mb-3 rounded-xl border border-[#d2bbff]/40 bg-[#d2bbff]/20 p-3">
                          <div className="mb-2 flex items-center gap-2">
                            <Sparkles className="text-[#5c00ca]" size={16} fill="currentColor" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#5c00ca]">
                              {activity.praiseLabel}
                            </span>
                          </div>
                          <p className="italic text-[#25005a]">{activity.body}</p>
                        </div>
                      ) : (
                        <p className="mb-4 text-slate-600">{activity.body}</p>
                      )}
                      <div className="flex items-center gap-3">
                        <button
                          className={`flex items-center gap-1.5 text-sm ${
                            activity.variant === "praise"
                              ? "font-bold text-[#3525cd]"
                              : "font-medium text-slate-500 transition hover:text-[#3525cd]"
                          }`}
                        >
                          <Heart
                            size={18}
                            fill={activity.variant === "praise" ? "currentColor" : "none"}
                          />{" "}
                          {activity.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-[#3525cd]">
                          <MessageCircle size={18} /> {activity.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>

          <aside className="col-span-12 space-y-4 xl:col-span-4">
            <div className="rounded-xl bg-white p-3 text-center shadow-sm md:p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#006a61]">
                HRMA Workspace
              </p>
              <h2 className="mb-2 font-['Manrope'] text-2xl font-black text-[#191c1e]">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h2>
              <p className="font-semibold text-slate-500">{today}</p>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f2f4f6] px-4 py-3">
                <h3 className="font-bold">Action Center</h3>
                <span className="rounded-full bg-[#ba1a1a] px-2.5 py-1 text-[10px] font-bold text-white">
                  {dashboardQuickNumbers.actionCountLabel}
                </span>
              </div>
              <div className="space-y-2 p-3">
                {dashboardActions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#f2f4f6]"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.tone}`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{item.title}</p>
                        <p className="truncate text-xs text-slate-500">{item.detail}</p>
                      </div>
                      <ChevronRight className="text-slate-300 transition group-hover:text-[#3525cd]" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm md:p-4">
              <h3 className="mb-3 font-bold">Leave Balance</h3>
              <div className="grid grid-cols-2 gap-3">
                {dashboardLeaveBalances.map((item) => (
                  <div key={item.label} className="rounded-xl bg-[#f2f4f6] p-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {item.label}
                    </p>
                    <p className="font-['Manrope'] text-xl font-black">{item.value}</p>
                    <p className="text-[10px] text-slate-500">Days Remaining</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm md:p-4">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
                On Leave Today
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {people.slice(0, 2).map((person) => (
                    <div
                      key={person.id || person.username}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#e2dfff] text-xs font-bold text-[#3525cd]"
                    >
                      {initials(person.username)}
                    </div>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#f2f4f6] text-xs font-bold text-slate-500">
                    {dashboardQuickNumbers.onLeaveExtra}
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {dashboardQuickNumbers.onLeaveTotal}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm md:p-4">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
                Working Remotely
              </h3>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#86f2e4]/20 p-2 text-[#006a61]">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-['Manrope'] text-xl font-black">
                    {Math.max(activeUsers - inactiveUsers, 0)}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Team Members
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#3525cd]/10 bg-white p-3 shadow-sm md:p-4">
              <Calendar className="absolute right-4 top-4 opacity-5" size={52} />
              <h3 className="relative z-10 mb-3 flex items-center gap-2 font-bold">
                Upcoming Holidays
                <span className="h-1.5 w-1.5 rounded-full bg-[#3525cd]" />
              </h3>
              <button className="group flex w-full items-center gap-3 rounded-xl border border-[#3525cd]/5 bg-[#3525cd]/5 p-3 text-left transition hover:bg-[#3525cd]/10">
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-[#3525cd] text-white shadow-md shadow-[#3525cd]/20">
                  <span className="text-[10px] font-bold uppercase leading-none opacity-80">
                    {dashboardHoliday.month}
                  </span>
                  <span className="text-sm font-black leading-tight">
                    {dashboardHoliday.day}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold">{dashboardHoliday.title}</p>
                  <div className="flex items-center gap-1 text-[#3525cd]/70">
                    <Calendar size={12} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      {dashboardHoliday.meta}
                    </span>
                  </div>
                </div>
                <ChevronRight className="text-[#3525cd]/40 transition group-hover:text-[#3525cd]" />
              </button>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-[#3525cd] to-[#4f46e5] p-3 text-white shadow-xl shadow-[#3525cd]/20 md:p-4">
              <h3 className="mb-3 text-sm font-bold">{dashboardHelpCard.title}</h3>
              <p className="mb-3 text-[13px] leading-relaxed text-white/80">
                {dashboardHelpCard.description}
              </p>
              <button className="flex h-8 w-full items-center justify-center gap-2 rounded-xl bg-white px-3 text-sm font-bold text-[#3525cd] shadow-md transition hover:bg-[#e2dfff]">
                <HelpIcon size={18} />
                {dashboardHelpCard.cta}
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
