import * as React from "react"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// 📅 helper: แปลง ค.ศ. → พ.ศ.
function buddhistYear(year: number) {
  return year + 543
}

interface DatePickerTHProps {
  value?: string | null
  onChange: (date: string | null) => void
}

export function DatePickerTH({ value, onChange }: DatePickerTHProps) {
  const [open, setOpen] = React.useState(false)
  const selectedDate = value ? new Date(value) : undefined

  // ฟังก์ชัน format วันที่เป็น พ.ศ.
  const formatBuddhist = (date: Date) => {
    const buddhist = buddhistYear(date.getFullYear())
    return format(date, `d MMMM ${buddhist}`, { locale: th })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? formatBuddhist(selectedDate) : <span>เลือกวันที่</span>}
        </Button>
      </PopoverTrigger>

      {/* ✅ Calendar + ปี พ.ศ. */}
      <PopoverContent align="start" className="p-0 w-auto">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setOpen(false)
            onChange(date ? format(date, "yyyy-MM-dd") : null)
          }}
          // ใช้ locale ภาษาไทย
          locale={th}
          // ✅ ปรับ header แสดงปี พ.ศ.
          className="rounded-md border shadow-sm"
          captionLayout="dropdown"
          autoFocus={true}
        />
      </PopoverContent>
    </Popover>
  )
}
