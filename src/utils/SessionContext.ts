import {useEffect, useState} from "react";
import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;
if (!SECRET_KEY) {
  console.error("SECRET_KEY is missing");
}

export function useSession() {
  const [session, setSession] = useState<{ host: string; user: string; password: string } | null>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("userSession");
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        if (!parsedSession?.password) {
          console.warn("Saved password is not accessible.");
          return;
        }
        const decryptedPassword = CryptoJS.AES.decrypt(parsedSession.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if (!decryptedPassword) {
          console.warn("Decrypting failed, saved data could be damaged.");
          return;
        }
        setSession({ ...parsedSession, password: decryptedPassword });
      } catch (error) {
        console.error("Decrypting password failed", error);
      }
    }
  }, []);

  const getUser = () => session;

  const writeUser = (host: string, user: string, password: string) => {
    const encryptedPassword = CryptoJS.AES?.encrypt(password, SECRET_KEY).toString();
    const newSession = { host, user, password: encryptedPassword };
    localStorage.setItem("userSession", JSON.stringify(newSession));
    setSession({ host, user, password });
  };

  const clearUser = () => {
    localStorage.setItem("userSession", JSON.stringify(null));
    setSession(null);
    window.location.reload();
  };

  return { getUser, writeUser, clearUser };
}
