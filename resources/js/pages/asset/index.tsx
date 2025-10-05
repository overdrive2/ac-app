import { useState } from 'react'
import route from 'ziggy-js'
import AppLayout from '@/layouts/app-layout'
import { Asset, type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'

import { assetColumns } from '@/columns/assetColumns'

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/datatable'
import AppPagination from '@/components/pagination'

import EditAssetDialog from '@/components/edit-asset-dialog'
import { toast } from 'sonner'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Assets',
    href: route('assets.index'),
  },
]

export default function AssetIndex() {
  const { rows, filters } = usePage().props
  const [search, setSearch] = useState(filters?.search || '')

  const [loading, setLoading] = useState(false)
  const [loadingAsset, setLoadingAsset] = useState(false)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openEdit = async (assetData: Asset) => {
    setLoadingAsset(true)
    setDialogOpen(true)

    try {
      const res = await fetch(route('assets.show', assetData.id))
      const data: Asset = await res.json()
      setEditingAsset(data)
    } finally {
      setLoadingAsset(false)
    }
  }

  const deleteAsset = (id: string | number) => {
    if (!confirm('Are you sure you want to delete this asset?')) return

    router.delete(route('assets.destroy', id), {
      preserveScroll: true,
      onStart: () => setLoading(true),
      onFinish: () => {
        setLoading(false)
        toast.info('Asset deleted.')
      },
    })
  }

  const columns = assetColumns({ openEdit, deleteAsset })

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

  const handleSearch = () => {
    router.get(
      route('assets.index'),
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
      <Head title="Assets" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <div className="flex gap-2 p-4">
            <Input
              type="search"
              placeholder="Search assets..."
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

      <EditAssetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        assetData={editingAsset}
        loading={loadingAsset}
      />
    </AppLayout>
  )
}