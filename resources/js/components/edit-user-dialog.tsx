import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { User } from "@/types"
import { toast } from "sonner"

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
import { Loader2 } from "lucide-react"

interface EditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userData: User | null
}

export default function EditUserDialog({ open, onOpenChange, userData }: EditUserDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [saving, setSaving] = useState(false)
  // โหลดค่ามาใส่ตอนเปิด dialog
  useEffect(() => {
    if (userData) {
      setName(userData.name)
      setEmail(userData.email)
    }
  }, [userData])

  const handleUpdate = () => {
    if (!userData) return
    setSaving(true)
    router.put(
      user.update(userData.id).url,
      { name, email },
      { 
        preserveState: true, 
        onSuccess: () => {
          onOpenChange(false)
          setSaving(false)
          toast.success("อัปเดตผู้ใช้เรียบร้อยแล้ว")
        },
        onError: () => {
          setSaving(false)
          toast.error("ไม่สามารถอัปเดตผู้ใช้ได้")
        }, 
      }
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
          <Button onClick={handleUpdate} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
