import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Asset, AssetCategory, AssetKind, type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'

import { assetColumns } from '@/columns/assetColumns'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/datatable'
import AppPagination from '@/components/pagination'

import { toast } from 'sonner'
import { categories, dashboard } from '@/routes'
import assets from '@/routes/assets'
import { CirclePlus } from 'lucide-react'
import AssetDialog from '@/components/asset-dialog'
import assetkind from '@/routes/assetkind'

interface Props {
  rows: {
    data: Asset[];
    links: any[];
  };
  filters: any;
  assetkind: AssetKind;
  category: AssetCategory;
  vendors: any[];
}

export default function AssetIndex() {
  const { rows, filters, assetkind: currentAssetKind, category, vendors } = usePage<Props>().props
  const [search, setSearch] = useState(filters?.search || '')

  const [loading, setLoading] = useState(false)
  const [loadingAsset, setLoadingAsset] = useState(false)
  const [dataAsset, setDataAsset] = useState<Asset | null>(null)
  const [dialogNewOpen, setDialogNewOpen] = useState(false)

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: "Asset Categories", href: categories().url }
  ];

  const [dsState, setDsState] = useState<"insert" | "update">("update")

  const openNew = async () => {
    setDsState("insert")
    setDialogNewOpen(true)
  }

  const openEdit = async (assetData: Asset) => {
    setDsState("update")
    setLoadingAsset(true)
    setDialogNewOpen(true)
    try {
      const res = await fetch(assets.edit(assetData).url)
      const data = await res.json();
      const asset: Asset = await data.asset;
      setDataAsset(asset)
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

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const toggleSelect = (id: number, selected: boolean) => {
    setSelectedIds((prev) =>
      selected ? [...prev, id] : prev.filter((x) => x !== id)
    )
  }

  const toggleSelectAll = (selected: boolean) => {
    setSelectedIds(selected ? rows.data.map((row) => row.id) : [])
  }

  const columns = assetColumns({
    openEdit,
    deleteAsset,
    toggleSelect,
    toggleSelectAll,
    selectedIds,
  })

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

  const handleBatchPrintPDF = () => {
    if (selectedIds.length === 0) {
      toast.warning("กรุณาเลือกรายการทรัพย์สินก่อนพิมพ์")
      return
    }

    const form = document.createElement("form")
    form.method = "POST"
    form.action = assets.qr.batch.pdf().url
    form.target = "_blank"

    // CSRF token
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")

    if (!token) {
      toast.error("CSRF token not found")
      return
    }

    const csrfInput = document.createElement("input")
    csrfInput.type = "hidden"
    csrfInput.name = "_token"
    csrfInput.value = token
    form.appendChild(csrfInput)

    // Add selected IDs
    selectedIds.forEach((id) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = "ids[]"
      input.value = id.toString()
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  const handleSearch = () => {
    router.get(
      assets.index(assetkind).url,
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
            <Button onClick={openNew} variant="outline"><CirclePlus /> Add</Button>
            <Input
              type="search"
              placeholder="Search assets..."
              value={search}
              className="lg:w-xs w-full"
              onChange={e => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
            <Button onClick={handleBatchPrintPDF} disabled={selectedIds.length === 0}>
              พิมพ์ QR Code ({selectedIds.length})
            </Button>
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
            <div></div>
          )}
        </div>
      </div>
      <AssetDialog
        open={dialogNewOpen}
        onOpenChange={setDialogNewOpen}
        form={dataAsset}
        category={category as AssetCategory | null}
        assetkind={currentAssetKind as AssetKind | null}
        loading={loadingAsset}
        dsState={dsState}
      />
    </AppLayout>
  )
}