import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Building } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/dashboard" className="flex items-center space-x-2 text-lg font-medium">
        <Building className="h-6 w-6" />
        <span>Strata Manager</span>
      </Link>
      <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/dashboard/strata-roll"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Strata Roll
      </Link>
      <Link
        href="/dashboard/maintenance"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Maintenance
      </Link>
      <Link
        href="/dashboard/finances"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Finances
      </Link>
      <Link
        href="/dashboard/documents"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Documents
      </Link>
    </nav>
  )
}

