import { DataTable } from "@/components/custom/data-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { columnsTransactionItems } from "../../components/columnsTransactionItems";
import type { HistoryData } from "../../types/history";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderDashboard from "@/components/custom/header-dashboard";

export default function InventoryHistory() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState<HistoryData[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);

                await new Promise(resolve => setTimeout(resolve, 2000));

                const dummyData: HistoryData[] = [
                    {
                        id: "1",
                        no: 1,
                        tanggal: new Date("2025-07-25").toISOString(),
                        nama_barang: "Obeng Set",
                        pekerja: "Andi",
                        tipe: "Pinjam",
                        jumlah: 5,
                    },
                    {
                        id: "2",
                        no: 2,
                        tanggal: new Date("2025-07-24").toISOString(),
                        nama_barang: "Tang Kombinasi",
                        pekerja: "Budi",
                        tipe: "Kembali",
                        jumlah: 2,
                    },
                    {
                        id: "3",
                        no: 3,
                        tanggal: new Date("2025-07-23").toISOString(),
                        nama_barang: "Bor Listrik",
                        pekerja: "Citra",
                        tipe: "Pinjam",
                        jumlah: 1,
                    },
                    {
                        id: "4",
                        no: 4,
                        tanggal: new Date("2025-07-22").toISOString(),
                        nama_barang: "Gergaji Besi",
                        pekerja: "Dewi",
                        tipe: "Kembali",
                        jumlah: 4,
                    },
                ];

                setItemList(dummyData);
                setTotalPages(1);
            } catch (error) {
                console.log("Response error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getData()
    }, [page, navigate])

    return (
        <div className="md:px-12 px-6 py-16 w-screen lg:w-full">
            {isLoading ? (
                <Skeleton className="h-8 w-40 rounded-md mb-4" />
            ) : (
                <HeaderDashboard title="History Transaction Items" />
            )}

            <DataTable
                columns={columnsTransactionItems}
                data={itemList}
                searchColumns={true}
                searchNameColumn="nama_barang"
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                isLoading={isLoading} />
        </div>
    )
}