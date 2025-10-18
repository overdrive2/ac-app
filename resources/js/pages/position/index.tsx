import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { dashboard, repository } from "@/routes";
import { Head, router, usePage } from "@inertiajs/react";
import { Position as DataPosition, BreadcrumbItem } from "@/types";
import { positionColumns } from "@/columns/positionColumns";
import EditPositionDialog from "@/components/edit-position-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable";
import AppPagination from "@/components/pagination";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { Skeleton } from "@/components/ui/skeleton";
import position from "@/routes/position";
import positions from "@/routes/positions";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: dashboard().url },
  { title: "Repository", href: repository().url },
  { title: 'Position', href: ''},
];

export default function PositionIndex() {
  const { rows, filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || "");
  const [loading, setLoading] = useState(false);
  const [editingPosition, setEditingPosition] = useState<DataPosition | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openEdit = async (pos: DataPosition) => {
    setDialogOpen(true);
    const res = await fetch(position.show(pos).url);
    const data: DataPosition = await res.json();
    setEditingPosition(data);
  };

  const deletePosition = (id: number) => {
    if (confirm("ต้องการลบตำแหน่งนี้หรือไม่?")) {
      router.delete(position.destroy(id).url, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          router.reload({ only: ["rows"] }); 
          toast.warning("ลบข้อมูลตำแหน่งเรียบร้อยแล้ว");
        },
      });
    }
  };

  const columns = positionColumns({ openEdit, deletePosition });

  const handleSearch = () => {
    router.get(
      positions.index().url,
      { search },
      {
        preserveState: true,
        replace: true,
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
      }
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Position Management" />

      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">ตำแหน่ง</h2>
        <Button
          onClick={() => {
            setDialogOpen(true);
            setEditingPosition(null);
          }}
        >
          เพิ่มตำแหน่ง
        </Button>
      </div>

      <div className="p-4 flex gap-2">
        <Input
          type="search"
          placeholder="ค้นหาชื่อตำแหน่ง..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>ค้นหา</Button>
      </div>

      {loading ? (
        <div className="p-4 space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      ) : rows ? (
        <div className="p-4">
          <DataTable columns={columns} data={rows.data} />
          <div className="mt-6">
            <AppPagination links={rows.links} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <PlaceholderPattern className="h-24 w-24 text-muted-foreground" />
        </div>
      )}

      <EditPositionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        positionData={editingPosition}
      />
    </AppLayout>
  );
}
