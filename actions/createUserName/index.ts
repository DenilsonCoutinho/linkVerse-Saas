"use server"
import { db as prisma} from "@/lib/db"
export async function CreateUserName(userName: string, id: string) {
    try {
        await prisma.userName.create({
            data: {
                username: userName,
                userId: id
            }
        })

        return { sucess: "Tudo ok! Vamos lá" }
    } catch (err) {
        return { error: err }
    }

}

