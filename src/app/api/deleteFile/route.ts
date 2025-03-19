import ImageKit from "imagekit"
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db"

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idImage = searchParams.get("idImage");
  // const idUser = searchParams.get("idUser");
  console.log("aqui",idImage);
  if (!idImage) {
    return Response.json({ error: "Erro ao deletar imagem!" }, { status: 400 });
  }
  imagekit.deleteFile(idImage as string, function (error, result) {
    if (error) return NextResponse.json({ status: 400, error })
  });

  return NextResponse.json({ status: 200 })
}