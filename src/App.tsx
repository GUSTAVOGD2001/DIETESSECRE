// src/App.tsx
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import { useSessionRole } from "./store/session";

type View = "login" | "dashboard";

export default function App() {
  const [view, setView] = useState<View>("login");
  const { role, logout } = useSessionRole();

  useEffect(() => {
    if (role !== "guest") setView("dashboard");
  }, [role]);

  if (view === "login") return <Login onSuccess={() => setView("dashboard")} />;

  return (
    <div style={{ maxWidth: 1100, margin: "24px auto", padding: 16, color: "#e2e8f0" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Panel — Rol: {role}</h1>
        <button onClick={logout} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #222", cursor: "pointer" }}>
          Cerrar sesión
        </button>
      </header>

      {/* Reglas de visibilidad por rol */}
      {role === "secretary" && (
        <section style={{ marginBottom: 16 }}>
          <p>Acceso de Secretaría: puede gestionar y visualizar citas.</p>
        </section>
      )}

      {role === "admin" && (
        <section style={{ marginBottom: 16 }}>
          <p>Acceso de Admin: además de ver citas, aquí podrías añadir paneles de administración.</p>
        </section>
      )}

      <Calendar />
    </div>
  );
}
