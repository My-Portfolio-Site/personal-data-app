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
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="max-w-full w-[100%]">
            <CardHeader>
              <div className="flex items-start flex-col justify-between">
                <div className="flex justify-between gap-2 w-full">
                  <Skeleton className="h-8 max-w-full w-30 flex-grow" />
                  <Skeleton className="h-8 w-12" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                {/* <Skeleton className="h-4 w-full" /> */}
              </div>
            </CardContent>
          </Card>
          ))}
      </PageContent>
    </section >
  )
}
