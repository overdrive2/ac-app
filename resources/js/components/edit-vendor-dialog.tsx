import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { AssetCategory } from "@/types"
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

import category from "@/routes/category"

interface EditAssetCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categoryData: AssetCategory | null
  loading?: boolean
}

export default function EditVendorDialog({
  open,
  onOpenChange,
  categoryData,
  loading = false,
}: EditAssetCategoryDialogProps) {
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [nameEn, setNameEn] = useState("")

  // โหลดค่าตอนเปิด dialog
  useEffect(() => {
    if (categoryData) {
      setCode(categoryData.code || "")
      setName(categoryData.name || "")
      setNameEn(categoryData.name_en || "")
    }
  }, [categoryData])

  const handleUpdate = () => {
    if (!categoryData) return

    router.put(
      category.update(categoryData.id).url,
      {
        code,
        name,
        name_en: nameEn,
      },
      {
        preserveState: true,
        onSuccess: () => {
          onOpenChange(false)
          toast.success("Category is updated successfully.")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Asset Category</DialogTitle>
          <DialogDescription>
            Update asset category information
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name (TH)
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name_en" className="text-right">
              Name (EN)
            </Label>
            <Input
              id="name_en"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
