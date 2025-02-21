"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../../../auth"

export async function GetUserData(id: string) {
     const DATA_AUTH = await auth()
        if (!DATA_AUTH) {
            throw new Error("Usuário não autenticado!")
        }
    try {
        const data = await prisma.userName.findFirst({
            where: { userId: id },
        })
        return data
    } catch (error) {

    }
}