import { Button } from "@/components/ui/button/button"
import type { ColumnDef } from "@tanstack/react-table"
import type { InventoryData } from "../types/inventory"
import type { useNavigate } from "react-router-dom"
import { Pencil, Trash2 } from "lucide-react"

export const columnsListItems = (navigate: ReturnType<typeof useNavigate>, onDelete: (id: string) => void): ColumnDef<InventoryData>[] => [
    {
        accessorKey: "no",
        header: "No",
    },
    {
        accessorKey: "nama",
        header: "Nama Barang",
    },
    {
        accessorKey: "kode",
        header: "Kode",
    },
    {
        accessorKey: "stok_tersedia",
        header: "Stok Tersedia",
    },
    {
        accessorKey: "stok_total",
        header: "Stok Total",
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="space-x-2">
                <Button
                    size="md"
                    variant="warning-default"
                    onClick={() => navigate(`/inventory/edit/${row.original.id}`)}
                >
                    <Pencil />
                </Button>
                <Button
                    size="md"
                    variant="danger-default"
                    onClick={() => onDelete(row.original.id)}
                >
                    <Trash2 />
                </Button>
            </div>
        ),
    },
]
