"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../../../auth";

export const updateLinkOrder = async (newCategoryOrder: { id: string; order: number }[]) => {
 const DATA_AUTH = await auth()
    if (!DATA_AUTH) {
        throw new Error("Usuário não autenticado!")
    }
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