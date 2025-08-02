import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { item_id: number; jumlah: number }) => void;
    mode: "pinjam" | "kembali";
}

export default function TransactionFormModal({ open, onClose, onSubmit, mode }: Props) {
    const [itemId, setItemId] = useState("");
    const [jumlah, setJumlah] = useState("");

    const handleSubmit = () => {
        if (!itemId || !jumlah) return;

        onSubmit({ item_id: parseInt(itemId), jumlah: parseInt(jumlah) });
        onClose();
        setItemId("");
        setJumlah("");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === "pinjam" ? "Pinjam Barang" : "Kembalikan Barang"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        type="number"
                        placeholder="ID Barang"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Jumlah"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                    />

                    <Button onClick={handleSubmit} className="w-full">
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
