"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../auth"
import { revalidateTag } from "next/cache"
export default async function CreateLink(link: string, active: boolean, userId: string,order:number) {
    const DATA_AUTH = await auth()
    if (!DATA_AUTH) {
        throw new Error("Usuário não autenticado!")
    }
    try {
        await prisma.links.create({
            data: {
                url: link,
                active: active,
                userId: userId,
                order:order
            }
        })
        await revalidateTag('links')
        return { sucess: "Tudo ok! Vamos lá" }
    } catch (err) {
        return { error: err }
    }
}