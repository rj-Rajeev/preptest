import type { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Tests",
      href: "/tests",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "My Tests",
      href: "/dashboard/tests",
      icon: "test",
    },
    {
      title: "Progress",
      href: "/dashboard/progress",
      icon: "chart",
    },
    {
      title: "Study Plan",
      href: "/dashboard/study-plan",
      icon: "calendar",
    },
    {
      title: "Achievements",
      href: "/dashboard/achievements",
      icon: "badge",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "dashboard",
    },
    {
      title: "Exams",
      href: "/admin/exams",
      icon: "category",
    },
    {
      title: "Tests",
      href: "/admin/tests",
      icon: "test",
    },
    {
      title: "Questions",
      href: "/admin/questions",
      icon: "question",
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "users",
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: "chart",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "settings",
    },
  ],
}
