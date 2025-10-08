// resources/js/Columns/assetCategoryColumns.tsx

import { ColumnDef } from "@tanstack/react-table"
import { Vendor } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Edit, List, Trash } from "lucide-react"
import { assetkinds } from "@/routes"
import { router } from "@inertiajs/react"

interface VendorColumnsProps {
  openEdit: (category: Vendor) => void
  deleteVendor: (id: string | number) => void
}

export function vendorColumns({
  openEdit,
  deleteVendor,
}: VendorColumnsProps): ColumnDef<Vendor>[] {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "ชื่อร้าน/บริษัท" },
    { accessorKey: "address", header: "ที่อยู่" },
    { accessorKey: "owner_name", header: "ชื่อผู้ติดต่อ" },
    { accessorKey: "phone", header: "เบอร์โทร" },
    { accessorKey: "tax_id", header: "TaxID" },

    /* ------- Action column ------- */
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost">
              <span aria-label="More actions">⋯</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-0 w-auto">
            {/* 1. Edit */}
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 hover:bg-muted"
              onClick={() => openEdit(row.original)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>

            {/* 2. Delete */}
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-destructive hover:bg-muted"
                onClick={() => deleteVendor(row.original.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </PopoverClose>
          </PopoverContent>
        </Popover>
      ),
    },
  ]
}
