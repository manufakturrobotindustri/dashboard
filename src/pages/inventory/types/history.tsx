export type TipeTransaksi = "Pinjam" | "Kembali";

export type HistoryData = {
    id: string
    no: number
    tanggal: string
    nama_barang: string
    pekerja: string
    tipe: TipeTransaksi
    jumlah: number
}