import { z } from "zod";

export const itemSchema = z.object({
    nama_barang: z.string().min(1, "Nama barang harus diisi"),
    kode_barang: z.string().min(1, "Kode barang harus diisi"),
    stok_total: z.number().min(0, "Stok tidak boleh negatif"),
});