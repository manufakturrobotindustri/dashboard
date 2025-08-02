import { DataTable } from "@/components/custom/data-table";
import HeaderDashboard from "@/components/custom/header-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HistoryData } from "../../types/history";
import { columnsTransactionItems } from "../../components/columnsTransactionItems";
import { Button } from "@/components/ui/button/button";
import { Plus, SendToBack } from "lucide-react";
import TransactionFormModal from "../../components/transactionFormModal";

export default function TransactionList() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState<HistoryData[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"pinjam" | "kembali">("pinjam");

    const handleOpenModal = (mode: "pinjam" | "kembali") => {
        setModalMode(mode);
        setModalOpen(true);
    };

    const handleSubmitTransaction = async ({ item_id, jumlah }: { item_id: number, jumlah: number }) => {
        try {
            const response = await fetch("/api/transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item_id, jumlah }),
            });
            const result = await response.json();
            console.log("Response:", result);
        } catch (error) {
            console.error("Error submitting transaction:", error);
        }
    };

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
                <div className="flex justify-between mb-4">
                    <Skeleton className="h-8 w-40 rounded-md" />
                    <div className="flex gap-2 justify-self-end">
                        <Skeleton className="h-10 w-full md:w-40 rounded-md" />
                        <Skeleton className="h-10 w-full md:w-40 rounded-md" />
                    </div>
                </div>
            ) : (
                <div className="flex justify-between">
                    <HeaderDashboard title="Transaction" />
                    <div className="flex flex-col md:flex-row gap-2 md:justify-self-end">
                        <Button
                            size="md"
                            className="flex w-full md:w-fit"
                            onClick={() => handleOpenModal("pinjam")}
                        >
                            <Plus className="w-5 h-5" />
                            Pinjam Barang
                        </Button>
                        <Button
                            size="md"
                            variant="primary-outline"
                            className="flex w-full md:w-fit"
                            onClick={() => handleOpenModal("kembali")}
                        >
                            <SendToBack className="w-5 h-5" />
                            Kembalikan Barang
                        </Button>
                    </div >
                </div>
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

            <TransactionFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmitTransaction}
                mode={modalMode}
            />
        </div>
    )
}