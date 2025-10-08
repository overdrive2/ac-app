import { useState, useEffect } from "react"
import { router, useForm } from "@inertiajs/react"
import { Vendor } from "@/types"
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

import vendors from "@/routes/vendors"
import { cn } from "@/lib/utils"

interface VendorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dsState: 'new' | 'edit'
  form: Vendor | null
  loading?: boolean
}

export default function VendorDialog({
  open,
  onOpenChange,
  dsState,
  form,
  loading,
}: VendorDialogProps) {
  const { data, setData, post, put, reset, processing, errors } = useForm({
    name: "",
    address: "",
    phone: "",
    owner_name: "",
    tax_id: "",
  })

  useEffect(() => {
    if(open && dsState == 'edit')
    {
      setData("name", form?.name || "")
      setData('address', form?.address || "")
      setData('phone', form?.phone || "")
      setData('owner_name', form?.owner_name || "")
      setData('tax_id', form?.tax_id || "")
    }
  }, [open, form, dsState])

  const handleStore = () => {
    if (!data) return

    if(dsState == 'new') {
      post(vendors.store().url, {
        preserveState: true,
        onSuccess: () => {
          onOpenChange(false)
          toast.success("Vendor is created successfully.")
        },
        onError: () => {
          toast.error("Failed to create asset kind.")
        },
      })
    }
    else if(dsState == 'edit') {
      put(vendors.update(form?.id).url, {
        preserveState: true,
        onSuccess: () => {
          toast.success("อัปเดตรายการผู้ขายเรียบร้อยแล้ว ✅")
          onOpenChange(false)
          reset()
      },
      onError: () => {
        toast.error("เกิดข้อผิดพลาดในการบันทึก ❌")
      },
      })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        if (dsState == 'new') reset()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dsState == 'new' ? 'New' : 'Edit'} Vendor</DialogTitle>
          <DialogDescription>
            {dsState == 'new' ? 'Create a new' : 'Update a'} vendor record in the system.
          </DialogDescription>
        </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Vendor Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className={cn(
                    "w-full",
                    errors.name && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <div className="col-span-3">
                <Input
                  id="address"
                  value={data.address}
                  onChange={(e) => setData("address", e.target.value)}
                  className={cn(
                    "w-full",
                    errors.address && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.address && <p className="mt-1 text-sm text-destructive">{errors.address}</p>}
              </div>
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <div className="col-span-3">
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => setData("phone", e.target.value)}
                  className={cn(
                    "w-full",
                    errors.phone && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>

            {/* Contact Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="owner_name" className="text-right">
                Contact Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="owner_name"
                  value={data.owner_name}
                  onChange={(e) => setData("owner_name", e.target.value)}
                  className={cn(
                    "w-full",
                    errors.owner_name && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.owner_name && (
                  <p className="mt-1 text-sm text-destructive">{errors.owner_name}</p>
                )}
              </div>
            </div>

            {/* Tax ID */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tax_id" className="text-right">
                Tax ID
              </Label>
              <div className="col-span-3">
                <Input
                  id="tax_id"
                  value={data.tax_id}
                  onChange={(e) => setData("tax_id", e.target.value)}
                  className={cn(
                    "w-full",
                    errors.tax_id && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.tax_id && <p className="mt-1 text-sm text-destructive">{errors.tax_id}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
            >
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
