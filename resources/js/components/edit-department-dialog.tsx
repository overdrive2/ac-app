import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { router } from "@inertiajs/react";
import { Department } from "@/types";
import department from "@/routes/department";

interface EditDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentData?: Department | null;
  parents?: Department[];
}

export default function EditDepartmentDialog({ open, onOpenChange, departmentData, parents = [] }: EditDepartmentDialogProps) {
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    parent_id: "",
  });

  useEffect(() => {
    if (departmentData) {
      setMode("edit");
      setFormData({
        name: departmentData.name || "",
        short_name: departmentData.short_name || "",
        parent_id: departmentData.parent_id?.toString() || "",
      });
    } else {
      setMode("create");
      setFormData({ name: "", short_name: "", parent_id: "" });
    }
  }, [departmentData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      router.post(department.store().url, formData, { onSuccess: () => onOpenChange(false) });
    } else if (departmentData) {
      router.put(department.update(departmentData.id).url, formData, { onSuccess: () => onOpenChange(false) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "เพิ่มหน่วยงาน" : "แก้ไขหน่วยงาน"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">ชื่อหน่วยงาน</Label>
            <Input id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>

          <div>
            <Label htmlFor="short_name">ชื่อย่อ</Label>
            <Input id="short_name" name="short_name" value={formData.short_name} onChange={(e) => setFormData({ ...formData, short_name: e.target.value })} />
          </div>

          <div>
            <Label htmlFor="parent_id">แผนกหลัก</Label>
            <Select
              value={formData.parent_id || "none"}
              onValueChange={(val) =>
                setFormData({
                  ...formData,
                  parent_id: val === "none" ? "" : val,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกแผนกหลัก (ถ้ามี)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— ไม่มี —</SelectItem>
                {parents.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              ยกเลิก
            </Button>
            <Button type="submit">
              {mode === "create" ? "บันทึก" : "อัปเดต"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}