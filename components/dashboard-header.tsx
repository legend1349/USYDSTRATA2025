import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  actionHref?: string
  actionIcon?: React.ReactNode
  actionText?: string
}

export function DashboardHeader({ heading, text, children, actionHref, actionIcon, actionText }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {actionHref && actionText ? (
        <Button asChild>
          <Link href={actionHref}>
            {actionIcon}
            {actionText}
          </Link>
        </Button>
      ) : (
        children
      )}
    </div>
  )
}

