import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { Position } from "@/types";
import { toast } from "sonner";
import position from "@/routes/position";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  positionData: Position | null;
}

export default function EditPositionDialog({ open, onOpenChange, positionData }: Props) {
  const { data, setData, post, put, reset } = useForm({
    name: positionData?.name ?? "",
  });

  useEffect(() => {
    if (open) {
      if (positionData) {
        // แก้ไข → เติมข้อมูลเดิม
        setData("name", positionData.name ?? "");
      } else {
        // เพิ่มใหม่ → reset ฟอร์ม
        reset();
      }
    }
  }, [open, positionData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (positionData) {
      put(position.update(positionData.id).url, {
        onSuccess: () => {
          toast.success("อัปเดตข้อมูลตำแหน่งเรียบร้อยแล้ว");
          onOpenChange(false);
          reset();
        },
      });
    } else {
      post(position.store().url, {
        onSuccess: () => {
          toast.success("เพิ่มตำแหน่งเรียบร้อยแล้ว");
          onOpenChange(false);
          reset();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{positionData ? "แก้ไขตำแหน่ง" : "เพิ่มตำแหน่งใหม่"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="ชื่อตำแหน่ง"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit">บันทึก</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
