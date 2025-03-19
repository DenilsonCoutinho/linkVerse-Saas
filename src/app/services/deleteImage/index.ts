"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../../../auth"
import { revalidateTag } from "next/cache"

export default async function DeleteImage(id: string) {
    const DATA_AUTH = await auth()
    if (!DATA_AUTH) {
        throw new Error("Usuário não autenticado!")
    }

    if (!id) throw new Error("o ID é obrigatório!")
    try {
        await prisma.user.update({
            where: { id },
            data: {
                image:null,
                imageID:null
            }
        })
        await revalidateTag("image") // Garante que só revalida se a criação deu certo

    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }

}