"use client";

import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";

// 🔹 Definice kontextu
interface SessionContextType {
  session: { host: string; user: string; password: string } | null;
  writeSession: (host: string, user: string, password: string, save: boolean) => Promise<void>;
  clearSession: () => void;
}

// 🔹 Vytvoření kontextu
const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{ host: string; user: string; password: string } | null>(null);

  // ✅ Při načtení aplikace zkontrolujeme uloženého uživatele (localStorage -> sessionStorage)
  useEffect(() => {
    const loadSession = async () => {
      const storedSession = localStorage.getItem("userSession") || sessionStorage.getItem("userSessionTemp");

      if (storedSession) {
        try {
          const parsedSession = JSON.parse(storedSession);

          const response = await axios.post("/api/decrypt", {encryptedText: parsedSession?.password});

          const data = response.data;

          if (!data) {
            console.warn("Saved password is not accessible.");
            return;
          }

          const newSession = {
            host: parsedSession.host,
            user: parsedSession.user,
            password: data.decrypted
          };

          setSession(newSession);
        } catch (error) {
          console.error("Error loading session:", error);
        }
      }
    };

    loadSession();
  }, []);

  // ✅ Trvalé přihlášení (ukládá se do `localStorage` a šifruje na serveru)
  const writeSession = async (host: string, user: string, password: string, save: boolean) => {
    try {
      const response = await axios.post("/api/encrypt", { text: password});

      const data = response.data;

      if (!data.encrypted) {
        new Error(data.error || "Encryption failed");
      }

      const encryptedPassword = data.encrypted;
      const newSession = { host, user, password: encryptedPassword };

      if (save) {
        localStorage.setItem("userSession", JSON.stringify(newSession));
      }
      else {
        sessionStorage.setItem("userSessionTemp", JSON.stringify(newSession));
      }

      setSession(newSession);
    } catch (error) {
      console.error("Error encrypting password:", error);
    }
  };

  // ✅ Odhlášení (smazání `localStorage` i `sessionStorage`)
  const clearSession = () => {
    localStorage.removeItem("userSession");
    sessionStorage.removeItem("userSessionTemp");
    setSession(null);
    window.location.reload(); // 🔥 Re-render po odhlášení
  };

  return (
    <SessionContext.Provider value={{ session, writeSession, clearSession }}>
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
