"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");

  return (
    <ToastContext.Provider value={(text: string) => {
      setMsg(text);
      setTimeout(() => setMsg(""), 2500);
    }}>
      {children}
      {msg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2
                        bg-white/10 backdrop-blur-md border border-white/30
                        px-4 py-2 rounded-lg text-white text-sm animate-fadein">
          {msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}