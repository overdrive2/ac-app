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
import { useForm, router } from "@inertiajs/react"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Asset, AssetItem, Brand, Vendor } from "@/types"
import assetItems from "@/routes/asset-items"
import { BrandCombobox } from "./brand-combobox"
import { DatePickerTH } from "./ui/date-picker-th"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "./ui/input-group"
import assets from "@/routes/assets"
import SearchVendorDialog from "./search-vendor-dialog"
import { Search } from "lucide-react"

interface AssetItemDialogProps {
  open: boolean
  mode: "new" | "edit" | "generate"
  onOpenChange: (open: boolean) => void
  item: AssetItem | null,
  brands: Brand[]
  asset: Asset | null
  vendors: Vendor[]
}

export default function AssetItemDialog({
  open,
  mode,
  onOpenChange,
  item,
  brands,
  vendors,
  asset
}: AssetItemDialogProps) {
  const { data, setData, post, put, processing, reset, errors } = useForm<AssetItem>({
    id: item?.id || 0,
    asset_id: item?.asset_id || 0,
    asset_item_code: item?.asset_item_code || "",
    asset_item_name: item?.asset_item_name || "",
    vendor_id: item?.vendor_id || null,
    buy_date: item?.buy_date || "",
    price: item?.price || null,
    warranty_months: item?.warranty_months || null,
    serial_number: item?.serial_number || "",
    status: item?.status || "active",
    remark: item?.remark || "",
    brand_id: item?.brand_id || null,
    quantity: 1,
  })

 // const [generateCount, setGenerateCount] = useState(1)
  const [vendorName, setVendorName] = useState("")
  const [vendorDialogOpen, setVendorDialogOpen] = useState(false)

  // Reset form when item changes
  useEffect(() => {
    if (mode === "new") {
      reset()
    }
    else if (mode === "generate") {
      setData("asset_id", asset?.id || 0)
      setData("asset_item_name", asset?.asset_name)
      setData("quantity", 1)

      fetch(assets.nextItemCode(asset).url)
        .then((res) => res.json())
        .then((res) => {
          setData("asset_item_code", res.next_code)
        })
        .catch(() => toast.error("Cannot load next asset code"))
      // fetch(assets.nextItemCode(asset).url).then(response => response.json())
      /*fetch(assets.nextItemCode(data.asset_id).url)
        .then(response => response.json())
        .then(data => {
          console.log(data.next_code)
          //setData("asset_item_code", data.code)
        })*/
    }
    else if (item && mode === "edit") {
      setData({
        id: item.id,
        asset_id: item.asset_id,
        asset_item_code: item.asset_item_code,
        asset_item_name: item.asset_item_name,
        vendor_id: item.vendor_id ?? null,
        brand_id: item.brand_id ?? null,
        buy_date: item.buy_date ?? "",
        price: item.price ?? null,
        warranty_months: item.warranty_months ?? null,
        serial_number: item.serial_number ?? "",
        status: item.status ?? "active",
        remark: item.remarks ?? "",
      })
    }
    else {
      //reset()
    }
  }, [item, mode])

  interface SubmitEvent {
    preventDefault: () => void;
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    if (mode === "new") {

    }
    else if (mode === "generate") {
      post(assets.generateItems(asset?.id).url,
        {
          preserveState: true,
          onSuccess: () => {
            toast.success("สร้างรหัสครุภัณฑ์ย่อยเรียบร้อยแล้ว")
            onOpenChange(false)
            reset()
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดในการสร้างรายการ")
          },
        }
      )
    }
    if (mode === "edit") {
      if (!item) return

      put(assetItems.update(item.id).url, {
        preserveState: true,
        onSuccess: () => {
          toast.success("อัปเดตข้อมูลเรียบร้อยแล้ว")
          onOpenChange(false)
          reset()
        },
        onError: () => toast.error("ไม่สามารถบันทึกข้อมูลได้"),
      })
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] p-0 flex flex-col">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>{mode === "edit" ? "แก้ไข" : (mode === "new" ? "เพิ่ม" : "เพิ่มหลายรายการ")}ข้อมูลครุภัณฑ์ย่อย</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>รหัส: {asset?.asset_code}</div>
                <div>ประเภท: {asset?.asset_name}</div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <form id="asset-item-form" onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2 items-center">
                {mode === "generate" && (
                  <div className="w-1/3 grid gap-2">
                    <Label>จำนวน</Label>
                    <InputGroup>
                      <InputGroupInput
                        type="number"
                        value={data.quantity}
                        className="px-2"
                        onChange={(e) => setData("quantity", Number(e.target.value))}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>เครื่อง</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                )}
                <div className="grow grid gap-2">
                  <Label>รหัสครุภัณฑ์ย่อย</Label>
                  <Input
                    value={data.asset_item_code}
                    onChange={(e) => setData("asset_item_code", e.target.value)}
                  />
                  {errors.asset_item_code && (
                    <p className="text-destructive text-sm">{errors.asset_item_code}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>ชื่อครุภัณฑ์ย่อย</Label>
                <Input
                  value={data.asset_item_name ?? ""}
                  onChange={(e) => setData("asset_item_name", e.target.value)}
                />
                {errors.asset_item_name && (
                  <p className="text-destructive text-sm">{errors.asset_item_name}</p>
                )}
              </div>

              <div className="flex justify-between gap-2">
                <div className="w-1/3 grid gap-2">
                  <Label>วันที่ซื้อ</Label>
                  <DatePickerTH
                    value={data.buy_date}
                    onChange={(val) => setData("buy_date", val)}
                  />
                </div>
                <div className="w-1/3 grid gap-2">
                  <Label>ราคา</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={data.price ?? 0}
                    onChange={(e) => setData("price", Number(e.target.value))}
                  />
                </div>
                <div className="w-1/3 grid gap-2">
                  <Label>รับประกัน (เดือน)</Label>
                  <Input
                    type="number"
                    value={data.warranty_months ?? 0}
                    onChange={(e) => setData("warranty_months", Number(e.target.value))}
                  />
                </div>
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
                <Label>ยี่ห้อ (Brand)</Label>
                <BrandCombobox
                  brands={brands}
                  value={data.brand_id ?? null}
                  onChange={(val) => setData("brand_id", val)}
                />
                {errors.brand_id && (
                  <p className="text-destructive text-sm">{errors.brand_id}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Serial Number</Label>
                <Input
                  value={data.serial_number ?? ""}
                  onChange={(e) => setData("serial_number", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>สถานะ</Label>
                <select
                  className="border rounded w-full px-2 py-1"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value as any)}
                >
                  <option value="active">ใช้งาน</option>
                  <option value="repair">ซ่อม</option>
                  <option value="disposed">จำหน่ายแล้ว</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label>หมายเหตุ</Label>
                <Input
                  value={data.remark}
                  onChange={(e) => setData("remark", e.target.value)}
                />
              </div>
            </form>
          </div>
          <DialogFooter className="p-4 border-t bg-muted/30 flex justify-end">
            <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>
              ยกเลิก
            </Button>
            <Button form="asset-item-form" type="submit" disabled={processing}>
              {processing ? "กำลังบันทึก..." : "บันทึก"}
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
