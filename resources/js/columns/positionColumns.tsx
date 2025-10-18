import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Position } from "@/types";

interface Handlers {
  openEdit: (pos: Position) => void;
  deletePosition: (id: number) => void;
}

export const positionColumns = ({ openEdit, deletePosition }: Handlers): ColumnDef<Position>[] => [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "ชื่อตำแหน่ง",
  },
  {
    id: "actions",
    header: "การจัดการ",
    cell: ({ row }) => (
      <div className="flex justify-end space-x-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => openEdit(row.original)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => deletePosition(row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
