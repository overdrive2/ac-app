import { ColumnDef } from "@tanstack/react-table"
import { Asset } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"

interface AssetColumnOptions {
  toggleSelect: (id: number) => void
  isSelected: (id: number) => boolean
}

export function assetColumns({
  toggleSelect,
  isSelected,
}: AssetColumnOptions): ColumnDef<Asset>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={table.toggleAllRowsSelected}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={isSelected(row.original.id)}
          onCheckedChange={() => toggleSelect(row.original.id)}
        />
      ),
    },
    { accessorKey: "asset_code", header: "Asset Code" },
    { accessorKey: "type_name", header: "Type" },
    { accessorKey: "vendor.name", header: "Vendor" },
  ]
}
