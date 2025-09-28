import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { User } from "@/types"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import user from "@/routes/user"

interface EditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userData: User | null
}

export default function EditUserDialog({ open, onOpenChange, userData }: EditUserDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  // โหลดค่ามาใส่ตอนเปิด dialog
  useEffect(() => {
    if (userData) {
      setName(userData.name)
      setEmail(userData.email)
    }
  }, [userData])

  const handleUpdate = () => {
    if (!userData) return
    router.put(
      user.show(userData.id).url,
      { name, email },
      { preserveState: true, onSuccess: () => onOpenChange(false) }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
