// pages/api/config.ts
import { NextResponse } from "next/server";
// require("dotenv").config({ path: [".env.local", ".env"] })

export  async function GET( res: NextResponse) {
    return Response.json({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  });
}
