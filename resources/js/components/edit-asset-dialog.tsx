// resources/js/components/edit-asset-dialog.tsx

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { Asset, AssetCategory, Vendor } from "@/types"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import assets from "@/routes/assets"

interface EditAssetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assetData: Asset | null
  categories: AssetCategory[]
  vendors: Vendor[]
  loading?: boolean
}

export default function EditAssetDialog({
  open,
  onOpenChange,
  assetData,
  categories,
  vendors,
  loading = false,
}: EditAssetDialogProps) {
  const [assetCode, setAssetCode] = useState("")
  const [typeName, setTypeName] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [vendorId, setVendorId] = useState("")
  const [warrantyMonths, setWarrantyMonths] = useState("")
  const [purchaseDate, setPurchaseDate] = useState("")

  useEffect(() => {
    if (assetData) {
      setAssetCode(assetData.asset_code || "")
      setTypeName(assetData.type_name || "")
      setCategoryId(assetData.asset_category_id?.toString() || "")
      setVendorId(assetData.vendor_id?.toString() || "")
      setWarrantyMonths(assetData.warranty_months?.toString() || "")
      setPurchaseDate(assetData.purchase_date || "")
    }
  }, [assetData])

  const handleUpdate = () => {
    if (!assetData) return

    router.put(
      assets.update(assetData.id).url,
      {
        asset_code: assetCode,
        type_name: typeName,
        asset_category_id: categoryId,
        vendor_id: vendorId,
        warranty_months: warrantyMonths,
        purchase_date: purchaseDate,
      },
      {
        preserveState: true,
        onSuccess: () => {
          onOpenChange(false)
          toast.success("Asset is updated successfully.")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
          <DialogDescription>Update asset information</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="asset_code" className="text-right">
              Code
            </Label>
            <Input
              id="asset_code"
              value={assetCode}
              onChange={(e) => setAssetCode(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type_name" className="text-right">
              Type
            </Label>
            <Input
              id="type_name"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vendor" className="text-right">
              Vendor
            </Label>
            <Select value={vendorId} onValueChange={setVendorId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                {vendors?.map((v) => (
                  <SelectItem key={v.id} value={String(v.id)}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="warranty" className="text-right">
              Warranty (months)
            </Label>
            <Input
              id="warranty"
              type="number"
              value={warrantyMonths}
              onChange={(e) => setWarrantyMonths(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="purchase_date" className="text-right">
              Purchase Date
            </Label>
            <Input
              id="purchase_date"
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
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
