"use server"
import { db as prisma } from "@/lib/db"

export default async function VerifyUserExist(username: string){
   
    const verifyUser = await prisma.userName.findUnique({
        where: { username: username}
    })
    return {data:verifyUser}
}