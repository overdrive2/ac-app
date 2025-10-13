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
import { AssetCategory, AssetKind, Asset } from "@/types"
import assets from "@/routes/assets"
import { useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from "./ui/skeleton"

interface AssetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: Asset | null
  category: AssetCategory | null
  assetkind: AssetKind | null
  loading: boolean,
  dsState: "insert" | "update",
}

export default function AssetDialog({
  open,
  onOpenChange,
  form,
  category,
  assetkind,
  loading,
  dsState
}: AssetDialogProps) {
  const { data, setData, post, put, reset, processing, errors } = useForm({
    asset_code: "",
    asset_name: "",
    asset_category_id: null as number | null,
    asset_kind_id: null as number | null,
  })

  const [vendorDialogOpen, setVendorDialogOpen] = useState(false)
  // โหลดค่าตอนเปิด dialog
  useEffect(() => {
    if (open && assetkind && category) {
      if(dsState == "insert") {
        setData("asset_category_id", category.id)
        setData("asset_kind_id", assetkind.id)
        //setData("asset_code", assetkind.asset_code)
        axios
          .get(assets.nextCode(assetkind.id).url)
          .then((res) => {
            setData("asset_code", res.data.next_code)
          })
          .catch(() => toast.error("ไม่สามารถสร้างรหัสอัตโนมัติได้"))
      }
      else if(dsState == "update") {
        setData("asset_category_id", category?.id || null)
        setData('asset_kind_id', form?.kind?.id || null)
        setData('asset_code', form?.asset_code || "")
        setData('asset_name', form?.asset_name || "")
      }
    }
  }, [open, form, assetkind, category, dsState])

  const handleSubmit = () => {
    if(dsState == "insert") {
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
    else if(dsState == "update" && form) {
      put(assets.update(form.id).url, {
        preserveState: true,
        onSuccess: () => {
          toast.success("Asset updated successfully.")
          onOpenChange(false)
          reset()
        },
        onError: () => toast.error("Failed to update asset."),
      })
    }
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
            <DialogTitle>{dsState === "insert" ? "New" : "Edit"} Asset</DialogTitle>
            <DialogDescription>Enter asset details to add a new one</DialogDescription>
          </DialogHeader>
          {loading ? (<Skeleton className="h-8 w-full text-center">Loading...</Skeleton>) : null}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={processing}>
              {processing ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
