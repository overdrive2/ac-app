import { useState } from "react"
import { router } from "@inertiajs/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/datatable"
import { assetColumns } from "@/columns/assetColumns"
import { Asset } from "@/types"

interface AssetIndexProps {
  rows: {
    data: Asset[]
    links: any[]
  }
}

export default function AssetIndex({ rows }: AssetIndexProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const isSelected = (id: number) => selectedIds.includes(id)

  const handleBatchPrintPDF = () => {
    if (selectedIds.length === 0) {
      toast.warning("กรุณาเลือกรายการทรัพย์สินก่อนพิมพ์")
      return
    }

    const form = document.createElement("form")
    form.method = "POST"
    form.action = router()
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

  const columns = assetColumns({ toggleSelect, isSelected })

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Asset List</h2>
        <Button onClick={handleBatchPrintPDF} variant="default">
          🖨️ พิมพ์ QR Code (PDF)
        </Button>
      </div>

      <DataTable
        data={rows.data}
        columns={columns}
        rowRenderer={(row) => (
          <div key={row.id} className="flex items-center gap-4">
            <Checkbox
              checked={isSelected(row.id)}
              onCheckedChange={() => toggleSelect(row.id)}
            />
            <div>{row.asset_code}</div>
            <div>{row.type_name}</div>
          </div>
        )}
      />
    </div>
  )
}
