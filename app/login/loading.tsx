import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <section className="flex w-full items-center justify-center h-screen flex-col gap-1 px-4 lg:gap-2 lg:px-6">
      <div className="flex flex-col gap-6 max-w-80 w-full mx-2">
        {/* Skeleton for logo */}
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-sm" />
          <Skeleton className="h-8 max-w-40 w-full" />
          <Skeleton className="h-4 max-w-80 w-full" />
        </div>

        {/* Skeleton for input and button */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 max-w-80 w-full rounded-md" />
          <Skeleton className="h-10 max-w-80 w-full rounded-md" />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
          <Skeleton className="h-px max-w-80 w-full" />
          <span className="text-muted-foreground">Or</span>
          <Skeleton className="h-px max-w-80 w-full" />
        </div>

        {/* Social login buttons */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-10 max-w-80 w-full rounded-md" />
          <Skeleton className="h-10 max-w-80 w-full rounded-md" />
        </div>

        <Skeleton className="h-4 max-w-80 w-full" />
      </div>
      <div className="h-30"></div>
    </section >
  )
}
