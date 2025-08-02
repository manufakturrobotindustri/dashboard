import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { itemSchema } from "@/pages/inventory/schema/schema";
import type { InventoryData } from "@/pages/inventory/types/inventory";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ConfirmationDialog } from "@/components/custom/dialog/confirmation-dialog";
import { CancelDialog } from "@/components/custom/dialog/cancel-dialog";

export type EditItemFormValues = z.infer<typeof itemSchema>;

export default function EditItem() {
    const [openSave, setOpenSave] = useState(false);
    const [error, setError] = useState<string>("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<EditItemFormValues>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            nama_barang: "",
            kode_barang: "",
            stok_total: 0,
        },
    });

    useEffect(() => {
        const getData = async () => {
            try {
                if (!id) return;

                setIsLoading(true);

                await new Promise((res) => setTimeout(res, 2000));

                const storedData = localStorage.getItem("inventoryData");
                if (!storedData) return;

                const items: InventoryData[] = JSON.parse(storedData);
                const selectedItem = items.find((item) => item.id === id);

                if (!selectedItem) {
                    setError("Data barang tidak ditemukan.");
                    return;
                }

                setValue("nama_barang", selectedItem.nama);
                setValue("kode_barang", selectedItem.kode);
                setValue("stok_total", selectedItem.stok_total);

            } catch (err) {
                console.log("Error fetching item data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [id, navigate, setValue]);

    const onSubmit = async (data: EditItemFormValues) => {
        setLoading(true);

        try {
            console.log("Data yang disimpan:", data);
            setOpenSave(false);
            navigate(`/inventory`);
        } catch (err) {
            console.log("Error updating item data:", err);
            setError("Perubahan data gagal dilakukan. Silahkan periksa kembali.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:px-12 px-6 py-16 w-screen lg:w-full">
            {isLoading ? (
                <>
                    <div className="flex gap-2 justify-between mb-4 lg:mb-10 items-center">
                        <Skeleton className="h-6 w-[100px] md:w-[130px] rounded-md mb-1" />
                        <div className="flex gap-3">
                            <Skeleton className="h-10 w-24 rounded-md" />
                            <Skeleton className="h-10 w-24 rounded-md" />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex mb-4 lg:mb-10 justify-between items-center">
                    <h1 className="font-bold text-xl">Edit Data</h1>
                    <div className="flex gap-3">
                        <ConfirmationDialog open={openSave} setOpen={setOpenSave} onConfirm={handleSubmit(onSubmit)} isLoading={loading} />
                        <CancelDialog onCancel={() => navigate(`/inventory`)} />
                    </div>
                </div>
            )}

            {error && <p className="text-sm bg-danger-main-normal pl-4 py-2 text-typo-white rounded-md mb-8">{error}</p>}

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Skeleton className="h-6 w-[130px] rounded-md mb-1" />
                            <Skeleton className="h-12 w-full rounded-md" />
                        </div>
                    ))}
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nama_barang">Nama Barang</Label>
                        <Controller
                            name="nama_barang"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="nama_barang"
                                    placeholder="Masukkan nama barang"
                                    {...field}
                                />
                            )}
                        />
                        {errors.nama_barang && (
                            <p className="text-sm text-danger-main-normal">{errors.nama_barang.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="kode_barang">Kode</Label>
                        <Controller
                            name="kode_barang"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="kode_barang"
                                    placeholder="Masukkan kode barang"
                                    {...field}
                                />
                            )}
                        />
                        {errors.kode_barang && (
                            <p className="text-sm text-danger-main-normal">{errors.kode_barang.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="stok_total">Stok Total</Label>
                        <Controller
                            name="stok_total"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="stok_total"
                                    type="number"
                                    min={0}
                                    placeholder="Masukkan stok total"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />
                        {errors.stok_total && (
                            <p className="text-sm text-danger-main-normal">{errors.stok_total.message}</p>
                        )}
                    </div>

                </form>
            )}
        </div>
    );
}