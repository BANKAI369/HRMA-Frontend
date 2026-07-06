import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Heart,
  Home,
  Mail,
  MessageCircle,
  PartyPopper,
  ReceiptText,
  Search,
  Sparkles,
  Star,
  UserRound,
  Users,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DashboardPerson {
  id: string;
  username: string;
  role: string;
}

export interface DashboardNavItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export interface DashboardAction {
  title: string;
  detail: string;
  icon: LucideIcon;
  tone: string;
}

export interface DashboardPostTool {
  label: string;
  icon: LucideIcon;
}

export interface DashboardAnnouncement {
  title: string;
  description: string;
  badge: string;
  meta: string;
  variant: "primary" | "policy";
}

export interface DashboardActivity {
  author: string;
  initials: string;
  time: string;
  body: string;
  likes: number;
  comments: number;
  variant?: "praise";
  praiseLabel?: string;
}

export const dashboardNavItems: DashboardNavItem[] = [
  { label: "Home", icon: Home, active: true },
  { label: "Me", icon: UserRound },
  { label: "Inbox", icon: Mail },
  { label: "My Team", icon: Users },
  { label: "Engage", icon: MessageCircle },
  { label: "Performance", icon: Star },
];

export const fallbackRecentUsers: DashboardPerson[] = [
  { id: "fallback-1", username: "Jane Doe", role: "Designer" },
  { id: "fallback-2", username: "Mike Kim", role: "Engineer" },
  { id: "fallback-3", username: "Alex Rivera", role: "Manager" },
];

export const dashboardPostTools: DashboardPostTool[] = [
  { label: "Post", icon: FileText },
  { label: "Poll", icon: ClipboardCheck },
  { label: "Praise", icon: Sparkles },
];

export const dashboardAnnouncements: DashboardAnnouncement[] = [
  {
    title: "Q4 Strategy Kickoff: Moving Towards Nest 2.0",
    description: "Join us this Friday for an all-hands meeting regarding our new roadmap.",
    badge: "Company News",
    meta: "Friday, 10:00 AM",
    variant: "primary",
  },
  {
    title: "New Remote Work Guidelines",
    description: "Updated flexibility clauses have been added to the employee handbook.",
    badge: "Policy Update",
    meta: "3 min read",
    variant: "policy",
  },
];

export const dashboardMilestones = [
  {
    label: "3 Years",
    fallbackName: "Alex Rivera",
    icon: PartyPopper,
    cardClassName: "bg-[#86f2e4]/30",
    iconClassName: "text-[#006a61]",
    labelClassName: "text-[#006a61]",
  },
  {
    label: "New Joiner",
    fallbackName: "Sarah Chen",
    icon: Waves,
    cardClassName: "bg-[#e2dfff]",
    iconClassName: "text-[#3525cd]",
    labelClassName: "text-[#3525cd]",
  },
];

export const dashboardActivities: DashboardActivity[] = [
  {
    author: "David Wilson",
    initials: "DW",
    time: "2 hours ago",
    body:
      "Huge shoutout to the Design Team for shipping the new branding guidelines. The documentation is incredibly detailed and easy to use.",
    likes: 24,
    comments: 8,
  },
  {
    author: "Maria Garcia",
    initials: "MG",
    time: "5 hours ago",
    body:
      "Liam truly went above and beyond during the system migration. His technical depth and calm leadership were game-changers for the squad.",
    likes: 42,
    comments: 15,
    variant: "praise",
    praiseLabel: "Top Performer Praise",
  },
];

export const dashboardActions: DashboardAction[] = [
  {
    title: "Time-off Request",
    detail: "From Tom Vance",
    icon: CheckCircle2,
    tone: "bg-[#e2dfff] text-[#3525cd]",
  },
  {
    title: "Pending Expense",
    detail: "Travel Reimbursement",
    icon: ReceiptText,
    tone: "bg-[#89f5e7] text-[#006a61]",
  },
];

export const dashboardLeaveBalances = [
  { label: "Annual", value: "14.5" },
  { label: "Sick", value: "06" },
];

export const dashboardHoliday = {
  month: "Nov",
  day: "11",
  title: "Veterans Day",
  meta: "Upcoming",
};

export const dashboardHelpCard = {
  title: "Need Help?",
  description: "Access HR policies, benefits guides, and employee handbooks instantly.",
  cta: "Resource Center",
  icon: BookOpen,
};

export const dashboardQuickNumbers = {
  actionCountLabel: "3 NEW",
  onLeaveTotal: "6 Total",
  onLeaveExtra: "+4",
};

export const dashboardIcons = {
  Calendar,
  Heart,
  MessageCircle,
  Search,
  Sparkles,
};
