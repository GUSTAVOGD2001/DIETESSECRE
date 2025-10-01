// src/components/Login.tsx
import { useState } from "react";
import { useSessionRole } from "../store/session";

export default function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { loginWithPin } = useSessionRole();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginWithPin(pin.trim());
    if (!ok) {
      setError("PIN inválido. Secretaría: 1111, Admin: 0000.");
      return;
    }
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 360, margin: "20vh auto" }}
    >
      <h1 style={{ marginBottom: 8 }}>Ingresar con PIN</h1>
      <input
        placeholder="Introduce PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        inputMode="numeric"
        style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #222",
          background: "#67e8f9",
          cursor: "pointer",
        }}
      >
        Entrar
      </button>
      {error && <small style={{ color: "#e11d48" }}>{error}</small>}
      <small>Secretaría: 1111 · Admin: 0000</small>
    </form>
  );
}
