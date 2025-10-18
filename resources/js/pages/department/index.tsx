import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { dashboard, repository } from "@/routes";
import { Head, router, usePage } from "@inertiajs/react";
import { Department as DataDepartment, BreadcrumbItem } from "@/types";
import { departmentColumns } from "@/columns/departmentColumns";
import EditDepartmentDialog from "@/components/edit-department-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable";
import AppPagination from "@/components/pagination";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { Skeleton } from "@/components/ui/skeleton";
import department from "@/routes/department";
import departments from "@/routes/departments";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: dashboard().url },
  { title: "Repository", href: repository().url },
  { title: 'Position', href: ''},
];

export default function DepartmentIndex() {
  const { rows, filters, parents } = usePage().props;
  const [search, setSearch] = useState(filters?.search || "");
  const [loading, setLoading] = useState(false);
  const [editingDept, setEditingDept] = useState<DataDepartment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openEdit = async (dept: DataDepartment) => {
    setDialogOpen(true);
    const res = await fetch(department.show(dept).url);
    const data: DataDepartment = await res.json();
    setEditingDept(data);
  };

  const deleteDept = (id: number) => {
    if (confirm("ต้องการลบหน่วยงานนี้หรือไม่?")) {
      router.delete(department.destroy(id).url);
    }
  };

  const columns = departmentColumns({ openEdit, deleteDept });

  const handleSearch = () => {
    router.get(
      departments.index().url,
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
      <Head title="Department Management" />

      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">ฝ่าย</h2>
        <Button
          onClick={() => {
            setDialogOpen(true);
            setEditingDept(null);
          }}
        >
          เพิ่มหน่วยงาน
        </Button>
      </div>

      <div className="p-4 flex gap-2">
        <Input
          type="search"
          placeholder="ค้นหาชื่อหน่วยงาน..."
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

      <EditDepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        departmentData={editingDept}
        parents={parents}
      />
    </AppLayout>
  );
}
