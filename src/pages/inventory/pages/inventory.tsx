import { DataTable } from "@/components/custom/data-table";
import { Button } from "@/components/ui/button/button";
import { Skeleton } from "@/components/ui/skeleton";
import { History, Plus } from "lucide-react";
import { columnsListItems } from "../components/columnsListItems";
import { useEffect, useState } from "react";
import type { InventoryData } from "../types/inventory";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "@/components/custom/dialog/delete-dialog";
import HeaderDashboard from "@/components/custom/header-dashboard";

export default function InventoryPage() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState<InventoryData[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [targetId, setTargetId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = (id: string) => {
        setTargetId(id);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!targetId) return;
        setIsDeleting(true);

        await new Promise((res) => setTimeout(res, 500));
        setItemList((prev) => prev.filter((item) => item.id !== targetId));

        setIsDeleting(false);
        setTargetId(null);
        setOpenDeleteDialog(false);
    };


    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);

                await new Promise(resolve => setTimeout(resolve, 2000));

                const stored = localStorage.getItem("inventory");
                const parsed = stored ? JSON.parse(stored) : [];

                setItemList(parsed);

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
                    <HeaderDashboard title="Inventory" />
                    <div className="flex flex-col md:flex-row gap-2 md:justify-self-end">
                        <Button
                            size="md"
                            variant="primary-outline"
                            onClick={() => navigate('/inventory/history')}
                            className="flex w-full md:w-fit"
                        >
                            <History className="w-5 h-5" />
                            Riwayat Transaksi
                        </Button>
                        <Button
                            size="md"
                            onClick={() => navigate('/inventory/add')}
                            className="flex w-full md:w-fit"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Barang Baru
                        </Button>
                    </div >
                </div>
            )}

            <DataTable
                columns={columnsListItems(navigate, handleDelete)}
                data={itemList}
                searchColumns={true}
                searchNameColumn="nama"
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                isLoading={isLoading} />

            <DeleteDialog
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
            />
        </div >
    )
}