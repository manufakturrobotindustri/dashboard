import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { CircleAlert } from 'lucide-react';

export function AlertDestructive() {
    return (
        <Alert variant="destructive" className="flex items-center gap-2">
            <CircleAlert size={32} />
            <div className="flex flex-col">
                <AlertTitle>Data tidak valid</AlertTitle>
                <AlertDescription>
                    Pastikan seluruh data telah diisi dengan format yang benar.
                </AlertDescription>
            </div>
        </Alert>
    )
}
