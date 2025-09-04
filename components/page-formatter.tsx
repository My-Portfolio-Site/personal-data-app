import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from '@/lib/utils';

export function PageHeader({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className='flex-1 flex'>
          <div className=" w-full flex items-center justify-between">
            <div className='flex aspect-square size-4 items-center justify-center rounded-lg mr-3'>
              {/* <FileText className='size-4' /> */}
              <svg width="30" height="30" viewBox="0 0 85 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Logo Frame">
                  <g id="Logo">
                    <path id="Vector 3" d="M40.836 66.2022L79.9836 6.54866C80.42 5.88365 79.943 5 79.1476 5H55.926C55.5768 5 55.2528 5.18217 55.0715 5.48058L39.1454 31.6813C39.0503 31.8378 38.9999 32.0175 38.9999 32.2007V65.6536C38.9999 66.6467 40.2911 67.0325 40.836 66.2022Z" fill="#AC6DA6" />
                    <path id="Union" d="M6 6.12871C6 5.52864 6.52951 5.06362 7.12415 5.14406C21.5689 7.09789 26.3455 11.8988 28 27V86.8713C28 87.4714 27.4705 87.9364 26.8758 87.8559C12.4311 85.9021 7.65446 81.1012 6 66V6.12871Z" fill="#2C6397" />
                    <path id="Vector 2" d="M40.0168 86.4511L57.2798 60.1578C57.654 59.5878 58.4764 59.5513 58.8997 60.0859L79.7168 86.3792C80.2358 87.0348 79.7689 88 78.9327 88H40.8528C40.0572 88 39.5802 87.1161 40.0168 86.4511Z" fill="#2CAB7D" />
                  </g>
                </g>
              </svg>
            </div>
            
            <h1 className="text-lg font-medium">{title}</h1>
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
