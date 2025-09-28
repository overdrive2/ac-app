// resources/js/Columns/assetCategoryColumns.tsx

import { ColumnDef } from "@tanstack/react-table"
import { AssetCategory } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Edit, Trash } from "lucide-react"

interface AssetCategoryColumnsProps {
  openEdit: (category: AssetCategory) => void
  deleteCategory: (id: string | number) => void
}

export function assetCategoryColumns({
  openEdit,
  deleteCategory,
}: AssetCategoryColumnsProps): ColumnDef<AssetCategory>[] {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "name", header: "Name (TH)" },
    { accessorKey: "name_en", header: "Name (EN)" },

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
                onClick={() => deleteCategory(row.original.id)}
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
