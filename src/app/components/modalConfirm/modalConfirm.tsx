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
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface ModalProps {
    ElementDelete: ReactNode
    onDelete: () => void
}
export function AlertDialogDemo({ ElementDelete,onDelete }: ModalProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {ElementDelete}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja deletar este link?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não poderá ser desfeita!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Deletar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
