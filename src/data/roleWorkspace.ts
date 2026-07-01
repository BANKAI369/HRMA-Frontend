import type { AppRole } from "../utils/role";
import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  FileUser,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type RoleWorkspaceCard = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

export type RoleWorkspaceConfig = {
  label: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  highlight: string;
  primaryCards: RoleWorkspaceCard[];
  secondaryCards: RoleWorkspaceCard[];
};

const sharedEmployeeCards: RoleWorkspaceCard[] = [
  {
    title: "Profile",
    detail: "Keep your personal details and job info up to date.",
    icon: FileUser,
  },
  {
    title: "Leaves",
    detail: "Track balances and request time off quickly.",
    icon: ClipboardList,
  },
];

export const roleWorkspace: Record<AppRole, RoleWorkspaceConfig> = {
  SuperAdmin: {
    label: "Platform Control",
    dashboardTitle: "Enterprise Command Center",
    dashboardSubtitle:
      "Oversee tenants, compliance, access control, and system health across the platform.",
    welcomeTitle: "Platform control room",
    welcomeSubtitle:
      "You have the highest-level view of the product and the tools to keep every tenant aligned.",
    highlight: "Multi-tenant oversight",
    primaryCards: [
      {
        title: "Tenant Governance",
        detail: "Manage tenants, organizations, and platform-wide access.",
        icon: ShieldCheck,
      },
      {
        title: "Health Signals",
        detail: "Monitor usage, support load, and operational trends.",
        icon: BarChart3,
      },
    ],
    secondaryCards: [
      {
        title: "Security Reviews",
        detail: "Review access and audit activity before it becomes a problem.",
        icon: ShieldCheck,
      },
      ...sharedEmployeeCards,
    ],
  },
  Admin: {
    label: "Admin Console",
    dashboardTitle: "Admin Command Center",
    dashboardSubtitle:
      "Create departments, shape permissions, and keep the organization running smoothly.",
    welcomeTitle: "Admin overview",
    welcomeSubtitle:
      "Your workspace is focused on people operations, access control, and day-to-day oversight.",
    highlight: "Organization-wide control",
    primaryCards: [
      {
        title: "Departments",
        detail: "Create departments and assign the permissions they need.",
        icon: BriefcaseBusiness,
      },
      {
        title: "Users",
        detail: "Add employees and keep role assignments consistent.",
        icon: Users,
      },
    ],
    secondaryCards: [
      {
        title: "Access & Roles",
        detail: "Maintain RBAC rules and department-specific capabilities.",
        icon: ShieldCheck,
      },
      {
        title: "Engagement",
        detail: "Keep the company connected with announcements and updates.",
        icon: Sparkles,
      },
    ],
  },
  Manager: {
    label: "Team Hub",
    dashboardTitle: "Manager Team Hub",
    dashboardSubtitle:
      "Track your department, guide your team, and keep work moving without losing visibility.",
    welcomeTitle: "Team overview",
    welcomeSubtitle:
      "Your workspace is tuned for team coordination, approvals, and people development.",
    highlight: "Team leadership focus",
    primaryCards: [
      {
        title: "My Team",
        detail: "Review team members, requests, and progress in one place.",
        icon: Users,
      },
      {
        title: "Delivery",
        detail: "Keep performance work and priorities visible.",
        icon: ClipboardList,
      },
    ],
    secondaryCards: [
      {
        title: "Approvals",
        detail: "Review leave, onboarding, and department requests.",
        icon: BarChart3,
      },
      {
        title: "Planning",
        detail: "Balance workload and make sure the team stays aligned.",
        icon: Sparkles,
      },
    ],
  },
  Employee: {
    label: "My Workspace",
    dashboardTitle: "Employee Workspace",
    dashboardSubtitle:
      "Stay on top of your tasks, updates, leave, and personal profile information.",
    welcomeTitle: "Workspace overview",
    welcomeSubtitle:
      "This view is designed to help you settle in, stay informed, and get work done faster.",
    highlight: "Personal productivity",
    primaryCards: [
      {
        title: "My Profile",
        detail: "Complete your details and keep your account current.",
        icon: FileUser,
      },
      {
        title: "My Time",
        detail: "Check attendance, leave, and important calendar items.",
        icon: WalletCards,
      },
    ],
    secondaryCards: [
      {
        title: "Team Updates",
        detail: "See the latest announcements and important news.",
        icon: Sparkles,
      },
      {
        title: "Quick Actions",
        detail: "Jump into the tasks you use most often.",
        icon: ClipboardList,
      },
    ],
  },
};

export const getRoleWorkspace = (role?: AppRole | null) =>
  (role && roleWorkspace[role]) || roleWorkspace.Employee;
