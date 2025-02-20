"use server"
import { db as prisma } from "@/lib/db"
export const updateLinkOrder = async (newCategoryOrder: { id: string; order: number }[]) => {
   
    try {
        for (const { id, order } of newCategoryOrder) {
            await prisma.links.update({
                where: { id: id },
                data: { order: order },
            });
        }

        return { success: "Categorias atualizada com sucesso" }
    } catch (error) {
        return { error: 'Error ao atualizar posição' }
    }
}