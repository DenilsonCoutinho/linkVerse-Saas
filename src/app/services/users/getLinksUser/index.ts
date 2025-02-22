"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../../../../auth"

export async function GetLinkUser(id: string) {
    const DATA_AUTH = await auth()
    if (!DATA_AUTH) {
        throw new Error("Usuário não autenticado!")
    }
    try {
        const data = await prisma.links.findMany({
            where: { userId: id },
            select: { id: true, url: true, userId: true, active: true, order: true },
        })
        return data
    } catch (error) {

    }
}