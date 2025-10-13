import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Brand {
  id: number
  brand_name: string
  brand_name_en?: string
}

interface BrandComboboxProps {
  brands: Brand[]
  value: number | null
  onChange: (value: number | null) => void
}

export function BrandCombobox({ brands, value, onChange }: BrandComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selected = brands.find((b) => b.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? `${selected.brand_name}${selected.brand_name_en ? ` (${selected.brand_name_en})` : ""}` : "เลือกยี่ห้อ"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder="ค้นหายี่ห้อ..." />
          <CommandList>
            <CommandEmpty>ไม่พบยี่ห้อ</CommandEmpty>
            <CommandGroup>
              {brands.map((brand) => (
                <CommandItem
                  key={brand.id}
                  value={brand.brand_name}
                  onSelect={() => {
                    onChange(brand.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === brand.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {brand.brand_name}
                  {brand.brand_name_en && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({brand.brand_name_en})
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
