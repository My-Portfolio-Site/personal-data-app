
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, Edit } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateUser } from "@/app/admin/users/actions"
import { toast } from "sonner"
import { UpdateUserData } from "@/schemas/user"


export function EditUserForm({ initialData, isDisabled = false }: { initialData: UpdateUserData, isDisabled?: boolean }) {
  const [formData, setFormData] = useState({
    id: initialData.id,
    role: initialData.role,
    userVerified: initialData.userVerified,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const result = await updateUser(formData)
      if (!result.success) {
        toast.error(result.message || "Failed to update user")
      } else {
        setOpen(false)
        toast.success("User updated successfully")
      }
    } catch (err) {
      toast.error("Failed to update user")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={isDisabled}>
        <Button variant='secondary' size='icon' className='size-8 mr-4 hover:bg-secondary-hover'>
          <Edit size={64} color='#0887e7' strokeWidth={3} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the user's role and verification status.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={e => setFormData(f => ({ ...f, role: e.target.value as "user" | "admin" }))}
              placeholder="e.g., admin, user"
              autoFocus={true}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
            className=""
              id="userVerified"
              checked={formData.userVerified}
              onCheckedChange={checked => setFormData(f => ({ ...f, userVerified: Boolean(checked) }))}
            />
            <Label htmlFor="userVerified">User Verified</Label>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isLoading} type="submit">
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent >
    </Dialog>
  )
}
