/**
 * Main navigation item
 */
export interface MainNavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: string
}

/**
 * Sidebar navigation item
 */
export interface SidebarNavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: string
  items?: SidebarNavItem[]
}

/**
 * Dashboard configuration
 */
export interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  adminNav: SidebarNavItem[]
}

/**
 * Site configuration
 */
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}
