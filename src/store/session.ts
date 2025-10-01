// src/store/session.ts
import { useEffect, useState } from "react";

export type Role = "guest" | "secretary" | "admin";

const STORAGE_KEY = "dietessecre.session.role";
const SESSION_EVENT = "dietessecre:session";

function broadcast(role: Role) {
  window.dispatchEvent(new CustomEvent<Role>(SESSION_EVENT, { detail: role }));
}

function readRole(): Role {
  return ((localStorage.getItem(STORAGE_KEY) as Role) || "guest") as Role;
}

export function useSessionRole() {
  const [role, setRole] = useState<Role>(() => readRole());

  useEffect(() => {
    setRole(readRole());

    const handleSession = (event: Event) => {
      const custom = event as CustomEvent<Role>;
      setRole(custom.detail ?? "guest");
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setRole((event.newValue as Role) || "guest");
      }
    };

    window.addEventListener(SESSION_EVENT, handleSession as EventListener);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(SESSION_EVENT, handleSession as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const loginWithPin = (pin: string) => {
    let newRole: Role = "guest";
    if (pin === "1111") newRole = "secretary";
    if (pin === "0000") newRole = "admin";
    localStorage.setItem(STORAGE_KEY, newRole);
    setRole(newRole);
    broadcast(newRole);
    return newRole !== "guest";
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRole("guest");
    broadcast("guest");
  };

  return { role, loginWithPin, logout };
}
