import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PageContent } from "@/components/page-formatter"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <section>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <Skeleton className="h-5 w-5 rounded-sm" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Skeleton className="h-8 w-25" />
          <Skeleton className="h-8 w-8 ml-auto flex items-center gap-2" />
          <div className="lg:w-10"></div>
          
        </div>
      </header>
      <PageContent>
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
      </PageContent>
    </section >
  )
}
