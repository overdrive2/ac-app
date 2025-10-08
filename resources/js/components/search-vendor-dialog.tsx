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
import { Vendor } from "@/types"
import { useState } from "react"
import { toast } from "sonner"

interface SearchVendorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendors: Vendor[]
  onSelectVendor: (vendor: Vendor) => void
}

export default function SearchVendorDialog({
  open,
  onOpenChange,
  vendors,
  onSelectVendor,
}: SearchVendorDialogProps) {
  const [vendorSearch, setVendorSearch] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(vendorSearch.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>ค้นหา Vendor</DialogTitle>
          <DialogDescription>พิมพ์เพื่อค้นหาผู้จำหน่ายและเลือกหนึ่งรายการ</DialogDescription>
        </DialogHeader>

        {/* ช่องค้นหา */}
        <div className="py-2">
          <Input
            placeholder="พิมพ์ชื่อผู้จำหน่าย..."
            value={vendorSearch}
            onChange={(e) => setVendorSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {/* รายการ Vendor */}
        <div className="py-2 max-h-[300px] overflow-y-auto space-y-1">
          {filteredVendors.length > 0 ? (
            filteredVendors.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVendor(v)}
                className={`p-2 rounded-lg cursor-pointer border ${
                  selectedVendor?.id === v.id
                    ? "bg-accent border-primary"
                    : "hover:bg-accent"
                }`}
              >
                <p className="font-medium">{v.name}</p>
                <p className="text-sm text-muted-foreground">
                  {v.owner_name} {v.phone ? '☎️ '+v.phone : ''}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">
              ไม่พบข้อมูลผู้จำหน่าย
            </p>
          )}
        </div>

        {/* Preview vendor ที่เลือก */}
        {selectedVendor && (
          <div className="mt-4 border-t pt-3 text-sm space-y-1">
            <p><strong>ชื่อ:</strong> {selectedVendor.name}</p>
            <p><strong>ที่อยู่:</strong> {selectedVendor.address || "-"}</p>
            <p><strong>ผู้ติดต่อ:</strong> {selectedVendor.owner_name || "-"}</p>
            <p><strong>โทรศัพท์:</strong> {selectedVendor.phone || "-"}</p>
            <p><strong>เลขประจำตัวผู้เสียภาษี:</strong> {selectedVendor.tax_id || "-"}</p>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button
            onClick={() => {
              if (selectedVendor) {
                onSelectVendor(selectedVendor)
                toast.success(`เลือก ${selectedVendor.name} แล้ว`)
                onOpenChange(false)
              } else {
                toast.warning("กรุณาเลือกผู้จำหน่ายก่อน")
              }
            }}
            disabled={!selectedVendor}
          >
            ยืนยันการเลือก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
