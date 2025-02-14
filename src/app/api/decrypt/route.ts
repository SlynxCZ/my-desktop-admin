import {NextResponse} from "next/server";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY as string;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY není nastaven v .env souboru!");
}

export async function POST(req: Request) {
  try {
    const { encryptedText } = await req.json();

    const decryptedPassword = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    if (!decryptedPassword) {
      return NextResponse.json({ error: "Decryption failed" }, { status: 400 });
    }

    return NextResponse.json({ decrypted: decryptedPassword });
  } catch (error) {
    console.error("Error decrypting text:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
