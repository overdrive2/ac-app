import { useState } from 'react';
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';
import { Staff, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

import { staffColumns } from '@/columns/staffColumns';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DataTable } from '@/components/datatable';
import AppPagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import EditStaffDialog from "@/components/edit-staff-dialog"
import { Skeleton } from '@/components/ui/skeleton';
import staff from '@/routes/staff';
import staffs from '@/routes/staffs';
import { CirclePlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function StaffIndex() {
  const { rows, filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || "");

  const [loading, setLoading] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openEdit = async (staffData: Staff) => {
    setLoadingStaff(true);
    setDialogOpen(true);

    try {
      const res = await fetch(staff.show(staffData).url); // GET /staff/{id}
      const data: Staff = await res.json();
      setEditingStaff(data);
    } finally {
      setLoadingStaff(false);
    }
  };

  /* ----------  Delete ---------- */
  const deleteStaff = (id: string) => {
    if (!confirm("Are you sure you want to delete this staff?")) return;
    // เพิ่ม logic ลบจริงได้ เช่น router.delete(...)
  };

  const columns = staffColumns({ openEdit, deleteStaff });

  // 🔎 lazy load pagination
  const handlePageChange = (url: string) => {
    if (!url) return;
    router.get(
      url,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
      }
    );
  };

  // 🔎 search
  const handleSearch = () => {
    router.get(
      staffs.index().url,
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
      <Head title="Staff Management" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <div className="flex gap-2 p-4">
            <Button onClick={() => { setDialogOpen(true); setEditingStaff(null); }} variant="outline"><CirclePlus /> New</Button>
            <Input
              type="search"
              placeholder="Search staff..."
              value={search}
              className="lg:w-xs w-full"
              onChange={e => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
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
                <AppPagination links={rows.links} onPageChange={handlePageChange} />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <PlaceholderPattern className="h-24 w-24 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* ---------- Edit Staff Dialog ---------- */}
      <EditStaffDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        staffData={editingStaff}
      />
    </AppLayout>
  );
}
