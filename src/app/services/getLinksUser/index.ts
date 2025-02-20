"use server"
import { db as prisma } from "@/lib/db"

export async function GetLinkUser(id: string) {
    try {
        const data = await prisma.links.findMany({
            where: { userId: id },
        })
        return data
    } catch (error) {

    }
}