import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId"); //;

    if (!userId) {
        return Response.json({ error: "Usuário não autenticado!" }, { status: 400 });
    }

    const data = await prisma.user.findFirst(
        {
            where: { id: userId },
            select: { id: true, image: true, imageID: true, userName: true, }
        }
    )
    return NextResponse.json({ data })
}