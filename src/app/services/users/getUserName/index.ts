"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../../../../auth"

export async function GetUserData(id: string) {
    const DATA_AUTH = await auth()
    try {
        if (!DATA_AUTH) {
            throw new Error("Usuário não autenticado!")
        }
        const data = await prisma.userName.findFirst({
            where: { userId: id },
        })
        return data
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error
        }
    }
}