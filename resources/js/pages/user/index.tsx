import { useState } from 'react';
import { dashboard, users } from '@/routes';
import user from '@/routes/user';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

import { userColumns } from '@/columns/userColumns';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DataTable } from '@/components/datatable';
import AppPagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import EditUserDialog from "@/components/edit-user-dialog"
import { Skeleton } from '@/components/ui/skeleton';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function UserIndex() {
  const { rows, filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || "");

  const [loading, setLoading] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openEdit = async (userData: User) => {
    setLoadingUser(true)
    setDialogOpen(true)

    try {
      const res = await fetch(user.show(userData).url) // GET /users/{id} // ✅ inertia route helper
      const data: User = await res.json()
      setEditingUser(data)
    } finally {
      setLoadingUser(false)
    }
  }

  /* ----------  Delete ---------- */
  const deleteUser = (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
  };

  const columns = userColumns({ openEdit, deleteUser })

  // 🔎 lazy load pagination
  const handlePageChange = (url: string) => {
    if (!url) return
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
    )
  }

    // 🔎 search
  const handleSearch = () => {
    router.get(
      users().url,
      { search },
      {
        preserveState: true,
        replace: true,
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
      }
    )
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <div className="flex gap-2 p-4">
            <Input
              type="search"
              placeholder="Search users..."
              value={search}
              className="lg:w-xs w-full"
              onChange={e => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          {loading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) :rows ? (
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
      {/* ---------- Edit User Dialog ---------- */}
      <EditUserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        userData={editingUser}
      />
    </AppLayout>
  );
}
