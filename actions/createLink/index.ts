"use server"
import { db as prisma } from "@/lib/db"
export default async function CreateLink(link: string, active: boolean, userId: string) {
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