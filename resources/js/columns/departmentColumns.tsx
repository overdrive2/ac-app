import { ColumnDef } from "@tanstack/react-table"
import { Department } from "@/types"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Edit, Trash } from "lucide-react"

interface DepartmentColumnsProps {
  openEdit: (dept: Department) => void
  deleteDept: (id: number) => void
}

export function departmentColumns({
  openEdit,
  deleteDept,
}: DepartmentColumnsProps): ColumnDef<Department>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.original.id}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "ชื่อหน่วยงาน",
      cell: ({ row }) => (
        <div className="font-medium text-foreground">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "short_name",
      header: "ชื่อย่อ",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.short_name || "-"}
        </div>
      ),
    },
    {
      accessorKey: "parent.name",
      header: "แผนกหลัก",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.parent?.name || "— ไม่มี —"}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      enableHiding: false,
      cell: ({ row }) => {
        const dept = row.original

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                aria-label="Actions"
              >
                ⋯
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-auto" align="end">
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 hover:bg-muted"
                onClick={() => openEdit(dept)}
              >
                <Edit className="mr-2 h-4 w-4" />
                แก้ไข
              </Button>

              <PopoverClose asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-destructive hover:bg-muted"
                  onClick={() => deleteDept(dept.id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  ลบ
                </Button>
              </PopoverClose>
            </PopoverContent>
          </Popover>
        )
      },
    },
  ]
}
