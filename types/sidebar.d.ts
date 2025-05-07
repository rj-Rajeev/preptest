import type { TooltipContent } from "@/components/ui/tooltip"
import type React from "react"
import type { ReactNode } from "react"

export interface SidebarProviderProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export interface SidebarContext {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export interface SidebarProps {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  children: ReactNode
}

export interface SidebarMenuButtonProps {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export interface SidebarMenuActionProps {
  asChild?: boolean
  showOnHover?: boolean
}

export interface SidebarMenuSubButtonProps {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}

export interface SidebarMenuSkeletonProps {
  showIcon?: boolean
}
