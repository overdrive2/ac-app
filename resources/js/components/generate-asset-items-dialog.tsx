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
import { useEffect, useState } from "react"
import { GenerateAssetItemsData, Vendor } from "@/types"
import assets from "@/routes/assets"
import SearchVendorDialog from "./search-vendor-dialog"
import { Search } from "lucide-react"

interface GenerateAssetItemsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assetId: number,
  vendors: Vendor[]
}

export default function GenerateAssetItemsDialog({
  open,
  onOpenChange,
  assetId,
  vendors
}: GenerateAssetItemsDialogProps) {
  const [vendorDialogOpen, setVendorDialogOpen] = useState(false)
  const [vendorName, setVendorName] = useState("")

  const { data, setData, post, reset, processing, errors } = useForm<GenerateAssetItemsData>({
    quantity: 1,
    vendor_id: null,
    buy_date: "",
    price: null,
    warranty_months: null,
  })

  useEffect(() => {
    if (!open) reset()
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(assets.generateItems(assetId).url, {
      onSuccess: () => {
        toast.success("สร้างรหัสครุภัณฑ์ย่อยเรียบร้อยแล้ว")
        onOpenChange(false)
        reset()
      },
      onError: () => {
        toast.error("เกิดข้อผิดพลาดในการสร้างรายการ")
      },
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>สร้างรหัสครุภัณฑ์ย่อย</DialogTitle>
            <DialogDescription>
              กำหนดจำนวนและข้อมูลการซื้อ เพื่อสร้างรหัสครุภัณฑ์ย่อยภายใต้สินทรัพย์นี้
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-2">
              <Label>จำนวนเครื่อง</Label>
              <Input
                type="number"
                value={data.quantity}
                onChange={(e) => setData("quantity", Number(e.target.value))}
                min={1}
                required
              />
              {errors.quantity && <p className="text-destructive text-sm">{errors.quantity}</p>}
            </div>

            <div className="grid gap-2">
              <Label>วันที่ซื้อ</Label>
              <Input
                type="date"
                value={data.buy_date ?? ""}
                onChange={(e) => setData("buy_date", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>ราคา (ต่อเครื่อง)</Label>
              <Input
                type="number"
                value={data.price ?? ""}
                onChange={(e) => setData("price", Number(e.target.value))}
                step="0.01"
              />
            </div>

            <div className="grid gap-2">
              <Label>รหัสร้านค้า (Vendor ID)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={vendorName || ""}
                  placeholder="เลือกร้านค้า..."
                  readOnly
                  className="flex-1 bg-muted/40 cursor-default"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setVendorDialogOpen(true)}
                  title="ค้นหาร้านค้า"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>รับประกัน (เดือน)</Label>
              <Input
                type="number"
                value={data.warranty_months ?? ""}
                onChange={(e) => setData("warranty_months", Number(e.target.value))}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={processing}>
                {processing ? "กำลังสร้าง..." : "สร้างรายการ"}
              </Button>
            </DialogFooter>
          </form>
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