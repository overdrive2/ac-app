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
import { useForm } from "@inertiajs/react"
import { toast } from "sonner"
import { Vendor, AssetCategory, AssetKind, Asset } from "@/types"
import assets from "@/routes/assets"
import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import SearchVendorDialog from "./search-vendor-dialog"

interface AssetGenerateProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: Asset | null
  category: AssetCategory | null
  assetkind: AssetKind | null
  vendors: Vendor[],
  loading: boolean,
  dsState: "insert" | "update",
}

export default function AssetGenerateDialog({
  open,
  onOpenChange,
  form,
  category,
  assetkind,
  vendors,
  loading,
  dsState
}: AssetGenerateProps) {
  const { data, setData, post, reset, processing, errors } = useForm({
    asset_code: "",
    asset_name: "",
    asset_category_id: null as number | null,
    asset_kind_id: null as number | null,
    vendor_id: null,
    warranty_months: "",
  })

  const [vendorDialogOpen, setVendorDialogOpen] = useState(false)
  const [vendorName, setVendorName] = useState("")
  // โหลดค่าตอนเปิด dialog
  useEffect(() => {
    if (open && assetkind && category) {
      if(dsState == "insert") {
        setData("asset_category_id", category.id)
        setData("asset_kind_id", assetkind.id)
        setData("asset_code", assetkind.asset_code)
      }
      else if(dsState == "update") {
        console.log(form)
        setData("asset_category_id", form?.category?.id || null)
        setData('asset_kind_id', form?.kind?.id || null)
        setData('asset_code', form?.asset_code || "")
        setData('asset_name', form?.asset_name || "")
        setData('vendor_id', form?.vendor_id || null)
        setData('warranty_months', form?.warranty_months || null)
      }
    }
  }, [open, form, assetkind, category, dsState])

  const selectedVendor = vendors.find((v) => v.id === data.vendor_id)

  const handleSubmit = () => {
    post(assets.store().url, {
      preserveState: true,
      onSuccess: () => {
        toast.success("Asset created successfully.")
        onOpenChange(false)
        reset()
      },
      onError: () => toast.error("Failed to create asset."),
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(state) => {
        onOpenChange(state)
        if (state) {
          // Reset form data when opening the dialog
          reset()
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Asset</DialogTitle>
            <DialogDescription>Enter asset details to add a new one</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Asset Code */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="asset_code" className="text-right self-start mt-1.5">Code</Label>
              <div className="col-span-3">
                <Input
                  id="asset_code"
                  value={data.asset_code}
                  onChange={(e) => setData("asset_code", e.target.value)}
                  className="w-full"
                />
                {errors.asset_code && (
                  <p className="mt-1 text-sm text-destructive">{errors.asset_code}</p>
                )}
              </div>
            </div>

            {/* Type Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="asset_name" className="text-right self-start mt-1.5">Name</Label>
              <div className="col-span-3">
                <Input
                  id="asset_name"
                  value={data.asset_name}
                  onChange={(e) => setData("asset_name", e.target.value)}
                  className="w-full"
                />
                {errors.asset_name && (
                  <p className="mt-1 text-sm text-destructive">{errors.asset_name}</p>
                )}
              </div>
            </div>

            {/* Asset Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">ประเภทครุภัณฑ์</Label>
              <Input type="text" value={category.name} disabled className="col-span-3" />
            </div>

            {/* Asset Kind */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">ชนิด</Label>
              <Input type="text" value={assetkind?.type_name ?? ''} disabled className="col-span-3" />
            </div>

            {/* Vendor */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Vendor</Label>
              <div className="col-span-3 flex gap-1.5">
                <Input type="text" value={vendorName} disabled className="grow" />
                <Button type="button" onClick={() => setVendorDialogOpen(true)} variant="outline"><Search /></Button>
              </div>
            </div>

            {/* Warranty */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="warranty_months" className="text-right">Warranty (months)</Label>
              <div className="col-span-3 flex gap-1.5">
                <Input
                  id="warranty_months"
                  type="number"
                  value={data.warranty_months}
                  onChange={(e) => setData("warranty_months", e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={processing}>
              {processing ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog ค้นหา Vendor */}
      <SearchVendorDialog
        open={vendorDialogOpen}
        onOpenChange={setVendorDialogOpen}
        vendors={vendors}
        onSelectVendor={(vendor) => {
          setData("vendor_id", vendor.id)
          setVendorName(vendor.name)
        }}
      />
    </>
  )
}
