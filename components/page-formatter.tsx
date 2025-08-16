import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from '@/lib/utils';

export function PageHeader({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className='flex-1 flex justify-center'>
          <div className=" max-w-[780px] w-full flex items-center justify-between">
            <h1 className="text-base font-medium">{title}</h1>
            <div className="ml-auto flex items-center gap-2">
              {children}
            </div>
          </div>
        </div>
        <div className="lg:w-10"></div>
      </div>
    </header>

    // <header className="grid grid-cols-3 h-(--header-height) shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
    //   <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
    //     <SidebarTrigger className="-ml-1" />
    //     <Separator
    //       orientation="vertical"
    //       className="mx-2 data-[orientation=vertical]:h-4"
    //     />
    //   </div>

    //   <div className="flex justify-center ">
    //     <div className="max-w-[770px] w-full flex items-center justify-between">
    //       <h1 className="text-base font-medium">{title}</h1>
    //       <div className="ml-auto flex items-center gap-2">
    //         {children}
    //       </div>
    //     </div>
    //   </div>

    //   <div></div>
    // </header>
  )
}

export function PageContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className='flex-1 flex justify-center max-h-[calc(100dvh-var(--header-height))] min-h-[calc(100dvh-var(--header-height))] md:max-h-[calc(100vh-var(--header-height)-16px)] md:min-h-[calc(100vh-var(--header-height)-16px)]'>
      <div className={cn('mx-4 md:mx-8 my-2 space-y-4 max-w-[780px] w-full min-h-full overflow-y-scroll no-scrollbar rounded-sm', className)}>
        {children}
      </div>
    </div>
  )
}
