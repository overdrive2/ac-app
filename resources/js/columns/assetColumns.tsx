// resources/js/columns/assetColumns.tsx

import { ColumnDef } from "@tanstack/react-table"
import { Asset } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Edit, Trash, Image } from "lucide-react"
import { router } from "@inertiajs/react"
import assets from "@/routes/assets"

interface AssetColumnsProps {
  openEdit: (asset: Asset) => void
  deleteAsset: (id: string | number) => void
}

export function assetColumns({
  openEdit,
  deleteAsset,
}: AssetColumnsProps): ColumnDef<Asset>[] {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "asset_code", header: "Code" },
    { accessorKey: "kind.type_name", header: "Type" },
    { accessorKey: "kind.category.name", header: "Category" },
    { accessorKey: "vendor.name", header: "Vendor" },

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
            {/* Edit */}
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 hover:bg-muted"
              onClick={() => openEdit(row.original)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>

            {/* Delete */}
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-destructive hover:bg-muted"
                onClick={() => deleteAsset(row.original.id)}
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
