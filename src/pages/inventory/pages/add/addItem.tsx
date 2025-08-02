import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { itemSchema } from "../../schema/schema";
import type z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { ConfirmationDialog } from "@/components/custom/dialog/confirmation-dialog";
import { CancelDialog } from "@/components/custom/dialog/cancel-dialog";

export type AddItemFormValues = z.infer<typeof itemSchema>;

export default function AddItem() {
    const navigate = useNavigate();
    const [openSave, setOpenSave] = useState(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AddItemFormValues>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            nama_barang: "",
            kode_barang: "",
            stok_total: 0,
        },
    });


    useEffect(() => {
        const loadData = () => {
            setLoadData(true);
            setTimeout(() => {
                setLoadData(false);
            }, 1000);
        };
        loadData();
    }, []);

    const onSubmit = async (data: AddItemFormValues) => {
        setLoading(true);
        try {
            // Ambil data lama
            const existing = JSON.parse(localStorage.getItem("inventory") || "[]");
            const newItem = {
                id: Date.now().toString(),
                no: existing.length + 1,
                nama: data.nama_barang,
                kode: data.kode_barang,
                stok_total: data.stok_total,
            };

            localStorage.setItem("inventory", JSON.stringify([...existing, newItem]));

            navigate("/inventory");
        } catch (error) {
            console.log("Add item error:", error);
            setError("Gagal menambahkan item.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:px-12 px-6 py-16 w-screen lg:w-full">
            {error && <p className="text-sm bg-danger-main-normal pl-4 py-2 text-typo-white rounded-md mb-8">{error}</p>}

            {loadData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Skeleton className="h-6 w-[130px] rounded-md mb-1" />
                            <Skeleton className="h-12 w-full rounded-md" />
                        </div>
                    ))}
                </div>
            ) : (
                <form
                    className="space-y-4 flex flex-col gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex mb-4 lg:mb-10 justify-between items-center">
                        <h1 className="font-bold text-xl">Tambah Data</h1>
                        <div className="flex gap-3">
                            <ConfirmationDialog open={openSave} setOpen={setOpenSave} onConfirm={handleSubmit(onSubmit)} triggerText="" />
                            <Button
                                type="submit"
                                className="w-fit"
                                size="md"
                                disabled={loading}
                            >
                                {loading ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                            <CancelDialog onCancel={() => navigate(`/inventory`)} />
                        </div>
                    </div>

                    <div className="flex gap-3 w-fit">

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nama Barang */}
                        <div className="flex flex-col items-start">
                            <Label htmlFor="itemName" className="block text-sm font-medium">
                                Nama Barang
                            </Label>
                            <Controller
                                name="nama_barang"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="itemName"
                                        type="text"
                                        placeholder="Masukkan nama barang"
                                        className="mt-1 w-full"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.nama_barang && (
                                <p className="text-xs text-danger-main-normal mt-1">{errors.nama_barang.message}</p>
                            )}
                        </div>

                        {/* Kode Barang */}
                        <div className="flex flex-col items-start">
                            <Label htmlFor="itemCode" className="block text-sm font-medium">
                                Kode Barang
                            </Label>
                            <Controller
                                name="kode_barang"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="itemCode"
                                        type="text"
                                        placeholder="Masukkan kode barang"
                                        className="mt-1 w-full"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.kode_barang && (
                                <p className="text-xs text-danger-main-normal mt-1">{errors.kode_barang.message}</p>
                            )}
                        </div>

                        {/* Stok Total */}
                        <div className="flex flex-col items-start">
                            <Label htmlFor="stokTotal" className="block text-sm font-medium">
                                Stok Total
                            </Label>
                            <Controller
                                name="stok_total"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="stokTotal"
                                        type="number"
                                        min={0}
                                        placeholder="Masukkan stok total"
                                        className="mt-1 w-full"
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                )}
                            />
                            {errors.stok_total && (
                                <p className="text-xs text-danger-main-normal mt-1">{errors.stok_total.message}</p>
                            )}
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}