import { useState } from 'react'
import { dashboard, categories } from '@/routes'
import category from '@/routes/category'
import AppLayout from '@/layouts/app-layout'
import { AssetCategory, type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'

import { assetCategoryColumns } from '@/columns/assetCategoryColumns'

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/datatable'
import AppPagination from '@/components/pagination'

import EditAssetCategoryDialog from "@/components/edit-asset-category-dialog"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Asset Categories',
    href: categories().url,
  },
]

export default function AssetCategoryIndex() {
  const { rows, filters } = usePage().props
  const [search, setSearch] = useState(filters?.search || "")

  const [loading, setLoading] = useState(false)
  const [loadingCategory, setLoadingCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<AssetCategory | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  /* ---------- Edit ---------- */
  const openEdit = async (categoryData: AssetCategory) => {
    setLoadingCategory(true)
    setDialogOpen(true)

    try {
      // ✅ inertia route helper (assetCategory.show)
      const res = await fetch(category.show(categoryData).url)
      const data: AssetCategory = await res.json()
      setEditingCategory(data)
    } finally {
      setLoadingCategory(false)
    }
  }

  /* ---------- Delete ---------- */
  const deleteCategory = (id: string | number) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    router.delete(category.delete({ id }).url, {
      preserveScroll: true,
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
    })
  }

  const columns = assetCategoryColumns({ openEdit, deleteCategory })

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
      <Head title="Asset Categories" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          {/* Search bar */}
          <div className="flex gap-2 p-4">
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

      {/* ---------- Edit Dialog ---------- */}
      <EditAssetCategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categoryData={editingCategory}
        loading={loadingCategory}
      />
    </AppLayout>
  )
}
