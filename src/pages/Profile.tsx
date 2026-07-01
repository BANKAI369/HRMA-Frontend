import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api/baseUrl";
import { useAuth } from "../context/AuthContext";

interface TabItem {
  id: string;
  label: string;
}

type ProfileResponse = {
  id: string;
  username: string;
  email: string;
  department?: {
    id: string;
    name: string;
  } | null;
  personalDetails?: {
    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    phone?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    profilePhoto?: string | null;
  };
  jobDetails?: {
    employeeCode?: string | null;
    dateOfJoining?: string | null;
    location?: {
      id: string;
      name: string;
      countryCode?: string | null;
    } | null;
    jobTitle?: {
      id: string;
      name: string;
    } | null;
    manager?: {
      id: string;
      username: string;
      email: string;
    } | null;
    noticePeriod?: {
      id: string;
      name: string;
      days?: number | null;
    } | null;
    group?: {
      id: string;
      name: string;
      groupTypeId?: string | null;
    } | null;
  };
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not provided";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Not provided";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

const formatValue = (value?: string | null) => value?.trim() || "Not provided";

const buildSkills = (profile: ProfileResponse | null) => {
  const skills = [
    profile?.jobDetails?.jobTitle?.name,
    profile?.department?.name,
    profile?.jobDetails?.location?.name,
    profile?.jobDetails?.group?.name,
    profile?.personalDetails?.gender,
  ]
    .filter((value): value is string => Boolean(value && value.trim()))
    .slice(0, 5);

  return skills.length ? skills : ["Employee Profile"];
};

const getDisplayTitle = (profile: ProfileResponse | null) => {
  const parts = [profile?.jobDetails?.jobTitle?.name, profile?.department?.name]
    .filter((value): value is string => Boolean(value && value.trim()));
  return parts.length ? parts.join(" - ") : "Employee";
};

export default function Profile() {
  const { userName } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState("about");
  const [activeSummaryTab, setActiveSummaryTab] = useState("summary");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const res = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          return;
        }

        const data = (await res.json()) as ProfileResponse;
        setProfile(data);
      } catch {
        setProfile(null);
      }
    };

    loadProfile();
  }, [userName]);

  const profilePhoto = profile?.personalDetails?.profilePhoto ?? null;
  const displayName =
    profile?.personalDetails?.fullName || profile?.username || userName;
  const displayTitle = getDisplayTitle(profile);
  const email = profile?.email;
  const phone = profile?.personalDetails?.phone;
  const locationName = profile?.jobDetails?.location?.name;
  const employeeCode = profile?.jobDetails?.employeeCode;
  const departmentName = profile?.department?.name;
  const reportingManager = profile?.jobDetails?.manager?.username;
  const dateOfJoining = profile?.jobDetails?.dateOfJoining;
  const skills = buildSkills(profile);
  const about = profile
    ? `A ${formatValue(profile?.jobDetails?.jobTitle?.name).toLowerCase()} supporting ${formatValue(
        departmentName
      )} from ${formatValue(locationName)}.`
    : `${displayName} is loading profile data.`;

  const resolvedProfilePhoto = profilePhoto
    ? profilePhoto.startsWith("http")
      ? profilePhoto
      : `${API_BASE_URL.replace(/\/api$/, "")}${profilePhoto}`
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuDdqzy1rMIToOmCP6INNtidI0cLdSJCsbP7EuH3AzVwstdVG5rllegBd9CIFsaLChah6DSrLH6uEoK82kyLUplzZuta_Qx3opJZbThJoy68uYZSOpsTnNO4gf3PDCCafXL5Qz1ZiPkvIrAE6wknNmUbDfXas8NDqAbZJ9orizO7qzFsA4JCC9Vuu3sr3N8SwcGXUw6EiZL2b8AmWgcJdlvHj-2eGOVap8KwYdiplcnYWdFicIc7UNgB7t6sxL2i4mY4XghyJXUNwPhL";

  const mainTabs: TabItem[] = [
    { id: "about", label: "About" },
    { id: "profile", label: "Profile" },
    { id: "job", label: "Job" },
    { id: "documents", label: "Documents" },
    { id: "assets", label: "Assets" },
  ];

  const summaryTabs: TabItem[] = [
    { id: "summary", label: "Summary" },
    { id: "timeline", label: "Timeline" },
    { id: "activity", label: "Activity" },
  ];

  const activities = profile
    ? [
        {
          icon: "person",
          iconBg: "bg-indigo-50",
          iconColor: "text-indigo-600",
          title: "Profile synced",
          detail: `Loaded live data for ${displayName}.`,
          time: "Just now",
        },
        {
          icon: "badge",
          iconBg: "bg-teal-50",
          iconColor: "text-teal-600",
          title: "Department updated",
          detail: formatValue(departmentName),
          time: formatDate(dateOfJoining),
        },
        {
          icon: "work",
          iconBg: "bg-amber-50",
          iconColor: "text-amber-600",
          title: "Manager assigned",
          detail: formatValue(reportingManager),
          time: "Current",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-surface pb-12">
      {/* Bio-Tile Header */}
      <section className="mb-12 overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest shadow-sm">
        {/* Gradient Banner */}
        <div className="relative h-30 bg-gradient-to-br from-primary to-primary-container">
          <div className="absolute -bottom-10 left-8 flex items-end gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <img
                alt={displayName}
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                src={resolvedProfilePhoto}
              />
              <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-2 border-white bg-teal-500"></div>
            </div>
            {/* Name and Title */}
            <div className="mb-4">
              <h1 className="font-display text-3xl font-extrabold text-indigo-950">
                {displayName}
              </h1>
              <p className="font-headline text-sm font-semibold uppercase tracking-wider text-slate-500">
                {displayTitle}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-headline text-sm font-bold text-white transition-all backdrop-blur-md hover:bg-white/30">
              <span className="material-symbols-outlined text-sm">edit</span>{" "}
              Modify Profile
            </button>
            <div className="relative group">
              <button
                className="rounded-lg bg-white/20 p-2 text-white transition-all backdrop-blur-md hover:bg-white/30"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-100 bg-white py-2 shadow-xl">
                  <button className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-lg">
                      badge
                    </span>{" "}
                    ID Card
                  </button>
                  <button className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">
                    <span className="material-symbols-outlined text-lg">
                      exit_to_app
                    </span>{" "}
                    Resign from Job
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-slate-50 px-8 pb-6 pt-16">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-lg text-indigo-600">
              mail
            </span>
            <span className="font-body text-sm font-medium">
              {formatValue(email)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-lg text-indigo-600">
              call
            </span>
            <span className="font-body text-sm font-medium">
              {formatValue(phone)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-lg text-indigo-600">
              location_on
            </span>
            <span className="font-body text-sm font-medium">
              {formatValue(locationName)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-lg text-indigo-600">
              badge
            </span>
            <span className="font-body text-sm font-medium">
              {formatValue(employeeCode)}
            </span>
          </div>
        </div>

        {/* Business Details */}
        <div className="mx-8 border-t border-slate-100"></div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 px-8 py-6">
          <div className="flex flex-col">
            <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Business Unit
            </span>
            <span className="font-body text-sm font-medium text-indigo-950">
              {formatValue(departmentName)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Department
            </span>
            <span className="font-body text-sm font-medium text-indigo-950">
              {formatValue(departmentName)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Cost Center
            </span>
            <span className="font-body text-sm font-medium text-indigo-950">
              {formatValue(employeeCode)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Reporting Manager
            </span>
            <span className="font-body text-sm font-medium text-indigo-950">
              {formatValue(reportingManager)}
            </span>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="mx-8 border-t border-slate-100"></div>
        <div className="flex gap-8 px-8 py-2">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id)}
              className={`pb-3 font-headline text-sm font-bold transition-colors ${
                activeMainTab === tab.id
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-slate-500 hover:text-indigo-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Summary Navigation Tabs */}
      <nav className="mb-8 flex gap-6 border-b border-slate-100 px-4">
        {summaryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSummaryTab(tab.id)}
            className={`pb-4 font-headline text-sm font-bold transition-colors ${
              activeSummaryTab === tab.id
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content Grid */}
      {activeSummaryTab === "timeline" ? (
        <div className="grid grid-cols-12 gap-8 px-4">
          <div className="col-span-12">
            <div className="rounded-xl border border-outline-variant/10 bg-white p-8 shadow-sm">
              <h2 className="mb-8 flex items-center gap-2 font-headline text-xl font-extrabold text-indigo-950">
                <span className="material-symbols-outlined text-indigo-600">
                  history
                </span>
                Career Timeline
              </h2>
              <div className="relative ml-4 space-y-10 border-l-2 border-slate-100 pl-8">
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full border-4 border-white bg-indigo-600 shadow-sm"></div>
                  <p className="mb-1 font-headline text-xs font-bold uppercase tracking-widest text-indigo-600">
                    March 2024
                  </p>
                  <h3 className="font-headline text-base font-bold text-indigo-950">
                    Department Transition
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Transitioned to the Design Systems & Frameworks team to lead the enterprise-wide UI architecture.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full border-4 border-white bg-slate-300 shadow-sm"></div>
                  <p className="mb-1 font-headline text-xs font-bold uppercase tracking-widest text-slate-400">
                    Sept 2023
                  </p>
                  <h3 className="font-headline text-base font-bold text-indigo-950">
                    Project: Design System v2.0 Assigned
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Appointed as the lead architect for the next generation of the Nest Design System.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full border-4 border-white bg-slate-300 shadow-sm"></div>
                  <p className="mb-1 font-headline text-xs font-bold uppercase tracking-widest text-slate-400">
                    June 2022
                  </p>
                  <h3 className="font-headline text-base font-bold text-indigo-950">
                    Promoted to Senior Product Designer
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Recognized for exceptional contributions to the core product experience and mentorship.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full border-4 border-white bg-slate-300 shadow-sm"></div>
                  <p className="mb-1 font-headline text-xs font-bold uppercase tracking-widest text-slate-400">
                    Jan 2021
                  </p>
                  <h3 className="font-headline text-base font-bold text-indigo-950">
                    Joined Nest HR
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Started journey as a Product Designer focusing on employee engagement modules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeSummaryTab === "activity" ? (
        <div className="grid grid-cols-12 gap-8 px-4">
          <div className="col-span-12">
            <div className="rounded-xl border border-outline-variant/10 bg-white p-8 shadow-sm">
              <h2 className="mb-8 font-headline text-xl font-extrabold text-indigo-950">
                Activity
              </h2>
              <div className="space-y-4">
                {activities.length ? (
                  activities.map((activity) => (
                    <div
                      key={`${activity.time}-${activity.title}`}
                      className="flex gap-4 rounded-xl border border-outline-variant/10 bg-white p-4 shadow-sm"
                    >
                      <div
                        className={`${activity.iconBg} flex h-10 w-10 shrink-0 items-center justify-center rounded-full`}
                      >
                        <span
                          className={`material-symbols-outlined ${activity.iconColor}`}
                        >
                          {activity.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-700">
                          <span className="font-bold text-indigo-950">
                            {activity.title}
                          </span>{" "}
                          {activity.detail}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No activity available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6 px-4">
          {/* Main Content */}
          <div className="col-span-12 space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 space-y-6">
                {/* About Card */}
                <div className="rounded-xl border border-outline-variant/10 bg-white p-8 shadow-sm">
                  <h2 className="mb-4 font-headline text-lg font-extrabold text-indigo-950">
                    About
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {about}
                  </p>
                </div>

                {/* Primary Details Card */}
                <div className="rounded-xl border border-outline-variant/10 bg-white p-8 shadow-sm">
                  <h2 className="mb-6 font-headline text-lg font-extrabold text-indigo-950">
                    Primary Details
                  </h2>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-1">
                      <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        First Name
                      </p>
                      <p className="font-body text-sm font-medium text-indigo-950">
                        {formatValue(profile?.personalDetails?.firstName)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Last Name
                      </p>
                      <p className="font-body text-sm font-medium text-indigo-950">
                        {formatValue(profile?.personalDetails?.lastName)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Gender
                      </p>
                      <p className="font-body text-sm font-medium text-indigo-950">
                        {formatValue(profile?.personalDetails?.gender)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Date of Birth
                      </p>
                      <p className="font-body text-sm font-medium text-indigo-950">
                        {formatDate(profile?.personalDetails?.dateOfBirth)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Date of Joining
                      </p>
                      <p className="font-body text-sm font-medium text-indigo-950">
                        {formatDate(dateOfJoining)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Location
                      </p>
                      <p className="font-body text-sm font-medium text-indigo-950">
                        {formatValue(locationName)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Employee Code
                      </p>
                      <p className="font-body text-sm font-medium text-indigo-950">
                        {formatValue(employeeCode)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Reporting Manager
                      </p>
                      <p className="font-body text-sm font-medium text-indigo-950">
                        {formatValue(reportingManager)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="col-span-12 lg:col-span-6 rounded-xl border border-outline-variant/10 bg-white p-8 shadow-sm">
                <h2 className="mb-4 font-headline text-lg font-extrabold text-indigo-950">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
