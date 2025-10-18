import { ColumnDef } from "@tanstack/react-table"
import { Staff } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Edit, List, Trash } from "lucide-react"

interface StaffColumnsProps {
  openEdit: (staff: Staff) => void
  deleteStaff: (id: string | number) => void
}

export function staffColumns({ openEdit, deleteStaff }: StaffColumnsProps): ColumnDef<Staff>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.original.id}</div>,
    },
    {
      accessorKey: "name",
      header: "ชื่อ-สกุล",
      cell: ({ row }) => (
        <div className="font-medium text-foreground">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "position",
      header: "ตำแหน่ง",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.position || "-"}</div>
      ),
    },
    {
      accessorKey: "department",
      header: "หน่วยงาน",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.department || "-"}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "อีเมล",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.original.email || "-"}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "เบอร์โทร",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.original.phone || "-"}</div>
      ),
    },
    {
      id: "actions",
      header: "",
      enableHiding: false,
      cell: ({ row }) => {
        const staff = row.original

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                ⋯
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-auto" align="end">
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 hover:bg-muted"
                onClick={() => openEdit(staff)}
              >
                <Edit className="mr-2 h-4 w-4" />
                แก้ไข
              </Button>

              <PopoverClose asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-destructive hover:bg-muted"
                  onClick={() => deleteStaff(staff.id)}
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
