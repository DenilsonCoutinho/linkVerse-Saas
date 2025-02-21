"use server"
import { db as prisma } from "@/lib/db"
import { auth } from "../../auth"
export async function CreateUserName(userName: string, id: string) {
    const DATA_AUTH = await auth()
    if (!DATA_AUTH) {
        throw new Error("Usuário não autenticado!")
    }
    try {
        await prisma.userName.create({
            data: {
                username: userName,
                userId: id
            }
        })

        return { sucess: "Usuário criado com sucesso!" }
    } catch (err) {
        return { error: err }
    }

}

