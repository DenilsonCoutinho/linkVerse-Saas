"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../auth"
import { revalidateTag } from "next/cache"
export default async function CreateLink(title: string,url: string, active: boolean, userId: string,order:number) {
    const DATA_AUTH = await auth()
    if (!DATA_AUTH) {
        throw new Error("Usuário não autenticado!")
    }
    try {
        const newLink = await prisma.links.create({
            data: {
                url: url,
                order:order,
                active: active,
                userId: userId,
                title
            }
        })
        if (newLink) {
            await revalidateTag("links") // Garante que só revalida se a criação deu certo
        }
        return { sucess: "Tudo ok! Vamos lá" }
    } catch (err) {
        return { error: err }
    }
}