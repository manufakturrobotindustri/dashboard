import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CircleAlert } from 'lucide-react';

interface DeleteDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export function DeleteDialog({ open, setOpen, onConfirm }: DeleteDialogProps) {
    const handleConfirm = async () => {
        await onConfirm();
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="flex flex-col items-center p-0 overflow-clip text-center w-[380px] md:w-full rounded-xl">
                <AlertDialogHeader className="w-full flex flex-col gap-4">
                    <AlertDialogTitle className="flex items-center gap-2 py-3 px-4 bg-danger-main-normal text-2xl text-typo-white font-medium"><CircleAlert size={36} className="text-typo-white" /> Perhatian!</AlertDialogTitle>
                    <AlertDialogDescription className="text-xl text-center text-typo-black mt-0 w-full px-12">
                        Apakah anda yakin ingin menghapus data?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row items-center gap-3 md:gap-1 py-3">
                    <AlertDialogAction className="px-8 h-fit bg-info-main-normal text-typo-white hover:bg-info-main-hover" onClick={handleConfirm}>Ya</AlertDialogAction>
                    <AlertDialogCancel className="mt-0 px-8 h-fit bg-danger-main-normal text-typo-white hover:bg-danger-main-hover">Batal</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}