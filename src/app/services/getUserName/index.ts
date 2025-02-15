"use server"
import { db as prisma } from "@/lib/db"

export async function GetUserData(id: string) {
    try {
        const data = await prisma.userName.findFirst({
            where: { userId: id },
        })
        return data
    } catch (error) {

    }
}