import { usePage, router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/datatable'
import { columns } from '@/columns/TestColumns'
import TestForm from '@/Components/TestForm'
import tests from '@/routes/tests'

export default function TestIndex() {
  const { data } = usePage().props

  const handleCreate = () => {
    router.post(tests.store().url, {}, { preserveScroll: true })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Test Management</h1>
      <Button onClick={handleCreate}>Create New</Button>
      <DataTable columns={columns} data={data.tests} />
      <TestForm />
    </div>
  )
}
