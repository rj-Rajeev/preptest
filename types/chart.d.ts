import type { ReactNode } from "react"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

export interface ChartContainerProps {
  config: ChartConfig
  children: ReactNode
}

export interface ChartTooltipProps {
  content: ReactNode
}

export interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      name: string
      value: number
    }
  }>
  label?: string
}
