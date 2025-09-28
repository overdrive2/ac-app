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

export default function AppPagination({ links }) {
  if (!links || links.length === 0) return null;

  // เปลี่ยนชื่อปุ่มภาษาไทย (ถ้าต้องการ)
  const fixedLinks = links.map((l) => ({
    ...l,
    label: l.label
      .replace("&laquo; Previous", "« ก่อนหน้า")
      .replace("Next &raquo;", "ถัดไป »"),
  }));

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {fixedLinks.map((link, i) => {
          if (link.label.includes("Previous")) {
            return (
              <PaginationItem key={i}>
                <PaginationPrevious
                  as={Link}
                  href={link.prev_page_url || "#"}
                  className={!link.prev_page_url ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            );
          }

          if (link.label.includes("ถัดไป")) {
            return (
              <PaginationItem key={i}>
                <PaginationNext>
                  <Link href={link.url || "#"} disabled={!link.url} />
                </PaginationNext>
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
              <PaginationLink isActive={link.active} href={link.url || "#"} dangerouslySetInnerHTML={{ __html: link.label }} />
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
}