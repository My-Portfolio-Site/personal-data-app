import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PageContent } from "@/components/page-formatter"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Loading() {
  const messages = Array.from({ length: 4 }); // 4 dummy messages
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
        <div className="flex flex-col h-full p-4 space-y-4">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((_, index) => {
              const isUser = index % 2 === 0; // Alternate sides
              return (
                <div
                  key={index}
                  className={`flex items-start space-x-2 ${isUser ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" alt="avatar" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <Skeleton className={`flex-1 ${isUser ? "h-12 max-w-90" : "h-20 max-w-120"} rounded-md  w-full`} />
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <div className="flex items-center space-x-2 mt-4">
            <Skeleton className="flex-1 h-25 rounded-md" />
          </div>
        </div>
      </PageContent>
    </section >
  )
}
