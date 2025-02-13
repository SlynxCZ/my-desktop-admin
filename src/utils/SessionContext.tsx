"use client";

import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;
if (!SECRET_KEY) {
  console.error("SECRET_KEY is missing");
}

// 🔹 Definice kontextu
interface SessionContextType {
  session: { host: string; user: string; password: string } | null;
  writeUser: (host: string, user: string, password: string) => void;
  writeUserTemp: (host: string, user: string, password: string) => void;
  clearUser: () => void;
}

// 🔹 Vytvoření kontextu
const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{ host: string; user: string; password: string } | null>(null);

  // ✅ Při načtení aplikace zkontrolujeme uloženého uživatele (localStorage -> sessionStorage)
  useEffect(() => {
    const loadSession = () => {
      const storedSession = localStorage.getItem("userSession") || sessionStorage.getItem("userSessionTemp");

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
    };

    loadSession();
  }, []);

  // ✅ Trvalé přihlášení (ukládá se do `localStorage`)
  const writeUser = (host: string, user: string, password: string) => {
    const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
    const newSession = { host, user, password: encryptedPassword };

    localStorage.setItem("userSession", JSON.stringify(newSession)); // Uloží do localStorage
    setSession({ host, user, password });
  };

  // ✅ Dočasné přihlášení (ukládá se do `sessionStorage`, zmizí po zavření okna)
  const writeUserTemp = (host: string, user: string, password: string) => {
    const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
    const newSession = { host, user, password: encryptedPassword };

    sessionStorage.setItem("userSessionTemp", JSON.stringify(newSession)); // Uloží do sessionStorage
    setSession({ host, user, password });
  };

  // ✅ Odhlášení (smazání `localStorage` i `sessionStorage`)
  const clearUser = () => {
    localStorage.removeItem("userSession");
    sessionStorage.removeItem("userSessionTemp");
    setSession(null);
    window.location.reload(); // 🔥 Re-render po odhlášení
  };

  return (
    <SessionContext.Provider value={{ session, writeUser, writeUserTemp, clearUser }}>
      {children}
    </SessionContext.Provider>
  );
}

// 🔹 Vlastní hook pro přístup k session
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession musí být použit uvnitř SessionProvider");
  }
  return context;
}