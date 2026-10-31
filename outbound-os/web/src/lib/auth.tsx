import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { api, getToken, setToken } from "./api";

type User = { id: string; email: string; name: string };

type AuthCtx = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setSession: (token: string, user: User) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTok] = useState<string | null>(getToken());
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      token,
      setSession: (t, u) => {
        setToken(t);
        setTok(t);
        setUser(u);
      },
      login: async (email, password) => {
        const res = await api<{ token: string; user: User }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        setToken(res.token);
        setTok(res.token);
        setUser(res.user);
      },
      logout: () => {
        setToken(null);
        setTok(null);
        setUser(null);
      },
    }),
    [token, user],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
}
