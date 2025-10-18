import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { router } from "@inertiajs/react"
import { Department, Staff } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import departments from "@/routes/departments"
import staff from "@/routes/staff"

interface EditStaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staffData?: Staff | null
}

export default function EditStaffDialog({ open, onOpenChange, staffData }: EditStaffDialogProps) {
  const [mode, setMode] = useState<"create" | "edit">("create")

  const [depts, setDepts] = useState<Department[]>([])

  const [formData, setFormData] = useState<Staff>({
    id: 0,
    staff_code: "",
    full_name: "",
    position_id: null,
    department_id: null,
    active: true
  })

  useEffect(() => {
    fetch(departments.index().url + "?json=1")
      .then(res => res.json())
      .then(setDepts)
  }, [])

  useEffect(() => {
    if (staffData) {
      setMode("edit")
      setFormData({
        id: staffData.id,
        staff_code: staffData.staff_code || "",
        full_name: staffData.full_name || "",
        position_id: staffData.position_id || null,
        department_id: staffData.department_id || null,
        active: staffData.active ?? true
      })
    } else {
      setMode("create")
      setFormData({
        id: 0,
        staff_code: "",
        full_name: "",
        position_id: null,
        department_id: null,
        active: true
      })
    }
  }, [staffData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "create") {
      router.post(staff.store().url, formData, {
        onSuccess: () => onOpenChange(false),
      })
    } else {
      if (!staffData) return
      router.put(staff.update(staffData.id).url, formData, {
        onSuccess: () => onOpenChange(false),
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "➕ เพิ่มเจ้าหน้าที่ใหม่" : "✏️ แก้ไขข้อมูลเจ้าหน้าที่"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            หน้าต่างยืนยันการลบข้อมูล ใช้เพื่อยืนยันก่อนลบจริง
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="staff_code">รหัสพนักงาน</Label>
            <Input
              id="staff_code"
              name="staff_code"
              value={formData.staff_code}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="full_name">ชื่อ-สกุล</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="position">ตำแหน่ง</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>ฝ่าย</Label>
            <Select
              value={formData.department_id?.toString() ?? ""}
              onValueChange={(val) =>
                setFormData({ ...formData, department_id: val ? parseInt(val) : null })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกหน่วยงาน" />
              </SelectTrigger>
              <SelectContent>
                {depts.map(dep => (
                  <SelectItem key={dep.id} value={dep.id.toString()}>
                    {dep.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              ยกเลิก
            </Button>
            <Button type="submit">
              {mode === "create" ? "บันทึกข้อมูล" : "อัปเดตข้อมูล"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
