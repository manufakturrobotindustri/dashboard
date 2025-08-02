import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CircleAlert } from 'lucide-react';

interface ConfirmationDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: () => void;
    triggerText?: string;
    isLoading?: boolean;
}

export function ConfirmationDialog({ open, setOpen, onConfirm, triggerText = "Simpan", isLoading }: ConfirmationDialogProps) {
    const handleConfirm = async () => {
        await onConfirm();
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {triggerText && (
                <AlertDialogTrigger
                    className="w-fit bg-info-main-normal hover:bg-info-main-hover px-4 py-2 text-base text-typo-white rounded-md font-medium disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? "Menyimpan..." : triggerText}
                </AlertDialogTrigger>
            )}
            <AlertDialogContent className="flex flex-col items-center p-0 overflow-clip text-center w-[380px] md:w-full rounded-xl">
                <AlertDialogHeader className="w-full flex flex-col gap-4">
                    <AlertDialogTitle className="flex items-center gap-2 py-3 px-4 bg-warning-main-normal text-2xl font-medium"><CircleAlert size={36} className="text-danger-main-normal" /> Perhatian!</AlertDialogTitle>
                    <AlertDialogDescription className="text-xl text-center text-black mt-0 w-full px-12">
                        Apakah anda yakin ingin menyimpan perubahan?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row items-center gap-3 md:gap-1 py-3">
                    <AlertDialogAction className="px-8 h-fit bg-info-main-normal text-typo-white hover:bg-info-main-hover" onClick={handleConfirm}>Ya</AlertDialogAction>
                    <AlertDialogCancel className="mt-0 px-8 h-fit bg-danger-main-normal text-typo-white hover:bg-danger-main-hover border-none">Batal</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
