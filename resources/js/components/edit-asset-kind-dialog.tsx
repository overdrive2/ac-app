import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { AssetKind } from "@/types"

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
import { toast } from "sonner"
import assetkind from "@/routes/assetkind"

interface EditAssetKindDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assetKindData: AssetKind | null
  loading?: boolean
}

export default function EditAssetKindDialog({
  open,
  onOpenChange,
  assetKindData,
  loading = false,
}: EditAssetKindDialogProps) {
  const [asset_code, setAssetCode] = useState("")
  const [type_name, setTypeName] = useState("")
  const [useful_life, setUsefulLife] = useState(0)
  const [depreciation_rate, setDepreciationRate] = useState(0)


  // โหลดค่าตอนเปิด dialog
  useEffect(() => {
    if (assetKindData) {
      setAssetCode(assetKindData.asset_code || "")
      setTypeName(assetKindData.type_name || "")
      setUsefulLife(assetKindData.useful_life)
      setDepreciationRate(assetKindData.depreciation_rate)
    }
  }, [assetKindData])

  const handleUpdate = () => {
    if (!assetKindData) return

    router.put(
      assetkind.update(assetKindData.id).url,
      {
        asset_code,
        type_name,
        useful_life,
        depreciation_rate
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
          <DialogTitle>Edit Assetkind</DialogTitle>
          <DialogDescription>
            Update asset category information
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="asset_code" className="text-right">
              Code
            </Label>
            <Input
              id="asset_code"
              value={asset_code}
              onChange={(e) => setAssetCode(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type_name" className="text-right">
              Name (TH)
            </Label>
            <Input
              id="type_name"
              value={type_name}
              onChange={(e) => setTypeName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="useful_life" className="text-right">
              Useful Life
            </Label>
            <Input
              id="useful_life"
              value={useful_life}
              onChange={(e) => setUsefulLife(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="depreciation_rate" className="text-right">
              Depreciation Rate
            </Label>
            <Input
              id="depreciation_rate"
              type="number"
              value={depreciation_rate}
              onChange={(e) => setDepreciationRate(e.target.value)}
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
