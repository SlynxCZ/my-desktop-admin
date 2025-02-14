import {NextResponse} from "next/server";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY as string;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY není nastaven v .env souboru!");
}

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return NextResponse.json({ encrypted });
}
