import { useState, useEffect } from "react"
import { router, useForm } from "@inertiajs/react"
import { AssetKind, AssetCategory } from "@/types"

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

import { toast } from "sonner"
import assetkind from "@/routes/assetkind"
import { cn } from "@/lib/utils"

interface NewAssetKindDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assetKindData: AssetKind | null
  currentCategory: AssetCategory,
  loading: boolean
}

export default function NewAssetKindDialog({
  open,
  onOpenChange,
  currentCategory,
  loading
}: NewAssetKindDialogProps) {
  const { data, setData, post, reset, processing, errors } = useForm({
    asset_category_id: 0,
    asset_code: "",
    type_name: "",
    useful_life: 0,
    depreciation_rate: 0,
  })

  // โหลดค่าตอนเปิด dialog
  useEffect(() => {
    if (open && currentCategory) {
      setData("asset_category_id", currentCategory.id)

      
      fetch(assetkind.nextcode(currentCategory.id).url)
        .then((res) => res.json())
        .then((res) => {
          setData("asset_code", res.next_code)
        })
        .catch(() => toast.error("Cannot load next asset code"))
    }
  }, [open, currentCategory])

  const handleStore = () => {
    if (!data) return

    post(assetkind.store().url, {
      preserveState: true,
      onSuccess: () => {
        toast.success("Asset kind created successfully.")
        onOpenChange(false)
        reset()
      },
      onError: () => {
        toast.error("Failed to create asset kind.")
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={(state) => {
      onOpenChange(state)
      if (!state) reset()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Assetkind</DialogTitle>
          <DialogDescription>
            Create a new assetkind under the "{currentCategory.name_en}".
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Asset Code */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="asset_code" className="text-right">
              Code
            </Label>
            <div className="col-span-3">
              <Input
                id="asset_code"
                value={data.asset_code}
                onChange={(e) => setData("asset_code", e.target.value)}
                className={cn(
                  "w-full",
                  errors.asset_code && "border-destructive focus-visible:ring-destructive"
                )}
              />
              {errors.asset_code && (
                <p className="mt-1 text-sm text-destructive">{errors.asset_code}</p>
              )}
            </div>
          </div>

          {/* Type Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type_name" className="text-right">
              Name (TH)
            </Label>
            <div className="col-span-3">
              <Input
                id="type_name"
                value={data.type_name}
                onChange={(e) => setData("type_name", e.target.value)}
                className={cn(
                  "w-full",
                  errors.type_name && "border-destructive focus-visible:ring-destructive"
                )}
              />
              {errors.type_name && (
                <p className="mt-1 text-sm text-destructive">{errors.type_name}</p>
              )}
            </div>
          </div>

          {/* Useful Life */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="useful_life" className="text-right">
              Useful Life
            </Label>
            <div className="col-span-3">
              <Input
                id="useful_life"
                type="number"
                value={data.useful_life}
                onChange={(e) => setData("useful_life", parseInt(e.target.value) || 0)}
                className={cn(
                  "w-full",
                  errors.useful_life && "border-destructive focus-visible:ring-destructive"
                )}
              />
              {errors.useful_life && (
                <p className="mt-1 text-sm text-destructive">{errors.useful_life}</p>
              )}
            </div>
          </div>

          {/* Depreciation Rate */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="depreciation_rate" className="text-right">
              Depreciation Rate
            </Label>
            <div className="col-span-3">
              <Input
                id="depreciation_rate"
                type="number"
                value={data.depreciation_rate}
                onChange={(e) =>
                  setData("depreciation_rate", parseFloat(e.target.value) || 0)
                }
                className={cn(
                  "w-full",
                  errors.depreciation_rate && "border-destructive focus-visible:ring-destructive"
                )}
              />
              {errors.depreciation_rate && (
                <p className="mt-1 text-sm text-destructive">{errors.depreciation_rate}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleStore} disabled={processing}>
            {processing ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
