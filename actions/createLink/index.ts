"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../auth"
export default async function CreateLink(link: string, active: boolean, userId: string) {
    const DATA_AUTH = await auth()
    if (!DATA_AUTH) {
        throw new Error("Usuário não autenticado!")
    }
    try {
        await prisma.links.create({
            data: {
                url: link,
                active: active,
                userId: userId
            }
        })

        return { sucess: "Tudo ok! Vamos lá" }
    } catch (err) {
        return { error: err }
    }
}