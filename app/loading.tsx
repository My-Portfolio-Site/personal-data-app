import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="section">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-10" />
      </div>
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start flex-col justify-between">
                <div className="flex justify-between gap-2 w-full">
                  <Skeleton className="w-5 h-5 flex-none" />
                  <Skeleton className="h-6 w-30 flex-grow" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-5 w-48" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                </div>
              </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex items-start gap-2">
                    <Skeleton className="w-2 h-2 mt-2 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <Skeleton key={j} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
