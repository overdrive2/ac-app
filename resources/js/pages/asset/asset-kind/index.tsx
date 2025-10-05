import { useState } from 'react'
import { dashboard, categories, assetkinds } from '@/routes'
import AppLayout from '@/layouts/app-layout'
import { AssetKind, type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'

import { assetKindColumns } from '@/columns/assetKindColumns'

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/datatable'
import AppPagination from '@/components/pagination'

import EditAssetKindDialog from '@/components/edit-asset-kind-dialog'
import assetkind from '@/routes/assetkind'
import { toast } from 'sonner'
import { CirclePlus } from 'lucide-react'
import NewAssetKindDialog from '@/components/new-asset-kind-dialog'

export default function AssetKindIndex() {
  const { rows, filters, category: currentCategory } = usePage().props;
  
  const [search, setSearch] = useState(filters?.search)

  const [loading, setLoading] = useState(false)
  const [loadingAssetKind, setLoadingAssetKind] = useState(false)
  const [editingAssetKind, setEditingAssetKind] = useState<AssetKind | null>(null)
  const [dialogNewOpen, setDialogNewOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

    /* ---------- Breadcrumbs ---------- */
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: dashboard().url },
    { title: "Asset Categories", href: categories().url },
    { title: currentCategory.name ?? "", href: '' }, // แสดงชื่อหมวดหมู่ที่เลือก
  ]

      /* ---------- New ---------- */
  const openNew = async () => {
    setDialogNewOpen(true)
  }

  /* ---------- Edit ---------- */
  const openEdit = async (row: AssetKind) => {
    setLoadingAssetKind(true)
    setDialogOpen(true)

    try {
      const res = await fetch(assetkind.show(row).url)
      const data: AssetKind = await res.json()
      setEditingAssetKind(data)
    } finally {
      setLoadingAssetKind(false)
    }
  }

  /* ---------- Delete ---------- */
  const deleteAssetKind = (id: string | number) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    router.delete(assetkind.destroy({ id }).url, {
      preserveScroll: true,
      onFinish: () => {
        toast.info("Asset Categories is deleted.")
      },
    })
  }

  const columns = assetKindColumns({ openEdit, deleteAssetKind })

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
      categories().url,
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
      <Head title={currentCategory.name} />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          {/* Search bar */}
          <div className="flex gap-2 p-4">
            <Button onClick={openNew} variant="outline"><CirclePlus /> Add</Button>
            <Input
              type="search"
              placeholder="Search categories..."
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

      {/* ---------- New Dialog ---------- */}
      <NewAssetKindDialog
        open={dialogNewOpen}
        onOpenChange={setDialogNewOpen}
        currentCategory={currentCategory}
      />
      {/* ---------- Edit Dialog ---------- */}
      <EditAssetKindDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        assetKindData={editingAssetKind}
        loading={loadingAssetKind}
      />
    </AppLayout>
  )
}
