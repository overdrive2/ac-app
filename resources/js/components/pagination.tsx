import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "@inertiajs/react";

interface Props {
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  onPageChange?: (url: string) => void
}

export default function AppPagination({ links, onPageChange }: Props) {
  if (!links || links.length === 0) return null;

  // เปลี่ยนชื่อปุ่มภาษาไทย (ถ้าต้องการ)
  const fixedLinks = links.map((l) => ({
    ...l,
    label: l.label
      .replace("&laquo; Previous", "« Previous")
      .replace("Next &raquo;", "Next »"),
  }));

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {fixedLinks.map((link, i) => {
          if (i == 0) {
            return (
              <PaginationItem key={i}>
                <PaginationPrevious
                  href={link.url || "#"}
                  className={!link.url ? "pointer-events-none opacity-50" : ""}
                  onClick={(e) => {
                    if (onPageChange && link.url) {
                      e.preventDefault()
                      onPageChange(link.url)
                    }
                  }}
                />
              </PaginationItem>
            );
          }

          if (i == fixedLinks.length - 1) {
            return (
              <PaginationItem key={i}>
                <PaginationNext
                  href={link.url || "#"}
                  className={!link.url ? "pointer-events-none opacity-50" : ""}
                  onClick={(e) => {
                    if (onPageChange && link.url) {
                      e.preventDefault()
                      onPageChange(link.url)
                    }
                  }}
                />
              </PaginationItem>
            );
          }

          if (link.label.includes("...")) {
            return (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={link.active} href={link.url || "#"}
                dangerouslySetInnerHTML={{ __html: link.label }}
                onClick={(e) => {
                  if (onPageChange && link.url) {
                    e.preventDefault()
                    onPageChange(link.url)
                  }
                }}
              />
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
}