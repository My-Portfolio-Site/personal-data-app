// "use client"

// import type React from "react"
// import { Building } from "lucide-react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// interface FormModalProps {
//   isOpen: boolean
//   onClose: () => void
//   title: string
//   description: string
//   children: React.ReactNode
// }

// export function FormModal({ isOpen, onClose, title, description, children }: FormModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] no-scrollbar overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//         </DialogHeader>
//         <DialogDescription>
//           <div className="flex items-center gap-2">
//           <Building className="w-5 h-5" />
//                {description}
//            </div>
//         </DialogDescription>
//         {children}
//       </DialogContent>
//     </Dialog>
//   )
// }
