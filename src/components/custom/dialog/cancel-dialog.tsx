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

interface CancelDialogProps {
    onCancel: () => void;
}

export function CancelDialog({ onCancel }: CancelDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="md:w-fit w-full bg-danger-main-normal hover:bg-danger-main-hover px-4 py-2 text-sm text-typo-white rounded-md font-medium cursor-pointer">Batal</AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col items-center p-0 overflow-clip text-center w-[380px] md:w-full rounded-xl">
                <AlertDialogHeader className="w-full flex flex-col gap-4">
                    <AlertDialogTitle className="flex items-center gap-2 py-3 px-4 bg-danger-main-normal text-2xl text-typo-white font-medium"><CircleAlert size={36} className="text-typo-white" /> Perhatian!</AlertDialogTitle>
                    <AlertDialogDescription className="text-xl text-center text-black mt-0 w-full px-12 ">
                        Apakah anda yakin ingin membatalkan?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row items-center gap-3 md:gap-1 py-3">
                    <AlertDialogAction className="px-8 h-fit bg-info-main-normal text-typo-white hover:bg-info-main-hover" onClick={onCancel}>Ya</AlertDialogAction>
                    <AlertDialogCancel className="mt-0 px-8 h-fit bg-danger-main-normal text-typo-white hover:bg-danger-main-hover border-none">Batal</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
