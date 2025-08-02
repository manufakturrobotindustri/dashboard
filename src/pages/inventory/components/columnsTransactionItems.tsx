import type { ColumnDef } from "@tanstack/react-table";
import type { HistoryData } from "../types/history";

export const columnsTransactionItems: ColumnDef<HistoryData>[] = [
    {
        accessorKey: "no",
        header: "No",
    },
    {
        accessorKey: "tanggal",
        header: "Tanggal",
        cell: ({ getValue }) => {
            const raw = getValue() as string;
            const date = new Date(raw);
            return date.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        },
    },
    {
        accessorKey: "nama_barang",
        header: "Nama Barang",
    },
    {
        accessorKey: "pekerja",
        header: "Pekerja",
    },
    {
        accessorKey: "tipe",
        header: "Tipe",
    },
    {
        accessorKey: "jumlah",
        header: "Jumlah",
    },
];
