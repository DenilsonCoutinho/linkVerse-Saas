import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

export async function GET(request:Request) {
   imagekit.deleteFile("67d83fd7432c476416a902e8", function(error, result) {
    if(error)   return NextResponse.json({ status: 200,error})
  });
  return NextResponse.json({ status: 200})
}