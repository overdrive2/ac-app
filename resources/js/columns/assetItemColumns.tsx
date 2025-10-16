import { ColumnDef } from "@tanstack/react-table"
import { AssetItem } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Edit, Trash, Info } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { router } from "@inertiajs/react"
import assetItems from "@/routes/asset-items"

interface AssetItemColumnsProps {
  openEdit: (item: AssetItem) => void
  deleteItem: (id: number) => void
  toggleSelect?: (id: number, selected: boolean) => void
  toggleSelectAll?: (selected: boolean) => void
  selectedIds?: number[]
}

export function assetItemColumns({
  openEdit,
  deleteItem,
  toggleSelect,
  toggleSelectAll,
  selectedIds = [],
}: AssetItemColumnsProps): ColumnDef<AssetItem>[] {
  return [
    // ✅ Checkbox Select
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() && table.getPageCount() > 0
            }
            onCheckedChange={(checked: boolean) => toggleSelectAll?.(checked)}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={selectedIds.includes(row.original.id)}
            onCheckedChange={(checked: boolean) =>
              toggleSelect?.(row.original.id, checked)
            }
          />
        </div>
      ),
      size: 48,
      enableSorting: false,
    },

    // ✅ Core Columns
    { accessorKey: "id", header: "ID" },
    { accessorKey: "asset_item_code", header: "Item Code" },
    { accessorKey: "asset_item_name", header: "Asset Name" },
    { 
      accessorKey: "brand", 
      header: "Brand",
      cell: ({ getValue }) => {
        const brand = getValue() as { brand_name: string, brand_name_en?: string } | null
        return brand ? `${brand.brand_name}${brand.brand_name_en ? ` (${brand.brand_name_en})` : ""}` : "-"
      }
    },
    { accessorKey: "vendor.name", header: "Vendor" },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ getValue }) => (
        <span>
          {Number(getValue() || 0).toLocaleString("th-TH", {
            minimumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      accessorKey: "buy_date",
      header: "Buy Date",
      cell: ({ getValue }) => {
        const date = getValue() as string
        return date ? new Date(date).toLocaleDateString("th-TH") : "-"
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string
        const color =
          status === "active"
            ? "text-green-600"
            : status === "repair"
            ? "text-yellow-600"
            : "text-gray-500"
        return <span className={color}>{status}</span>
      },
    },

    // ✅ Actions
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

          <PopoverContent className="p-0 w-auto" forceMount>
            {/* Info */}
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 hover:bg-muted"
              onClick={() =>
                window.open(assetItems.show(row.original).url, '_blank')
              }
            >
              <Info className="mr-2 h-4 w-4" />
              View
            </Button>

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
                onClick={() => deleteItem(row.original.id)}
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
