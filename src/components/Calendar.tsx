// src/components/Calendar.tsx
import { useEffect, useMemo, useState } from "react";
import { addAppointment, Appointment, listAppointments, listByDate, seedIfEmpty } from "../lib/appointments";

function toISODate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Calendar() {
  const [current, setCurrent] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string>(() => toISODate(new Date()));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const daysInMonth = useMemo(() => {
    const y = current.getFullYear();
    const m = current.getMonth();
    return new Date(y, m + 1, 0).getDate();
  }, [current]);

  useEffect(() => {
    seedIfEmpty();
    setAppointments(listAppointments());
  }, []);

  const monthStartWeekday = new Date(current.getFullYear(), current.getMonth(), 1).getDay(); // 0=Domingo
  const monthLabel = current.toLocaleString(undefined, { month: "long", year: "numeric" });
  const datesWithAppts = new Set(appointments.map((a) => a.date));
  const selectedList = listByDate(selectedDate);

  const goPrev = () => {
    const c = new Date(current);
    c.setMonth(c.getMonth() - 1);
    setCurrent(c);
  };
  const goNext = () => {
    const c = new Date(current);
    c.setMonth(c.getMonth() + 1);
    setCurrent(c);
  };

  const handleAddQuick = (patient: string, time?: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    addAppointment({ id, date: selectedDate, time, patient });
    setAppointments(listAppointments());
  };

  // Render
  const cells: (string | null)[] = [];
  for (let i = 0; i < monthStartWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateISO = toISODate(new Date(current.getFullYear(), current.getMonth(), d));
    cells.push(dateISO);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={goPrev}>&lt;</button>
        <h2 style={{ margin: 0, textTransform: "capitalize" }}>{monthLabel}</h2>
        <button onClick={goNext}>&gt;</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((w) => (
          <div key={w} style={{ textAlign: "center", fontWeight: 600 }}>
            {w}
          </div>
        ))}
        {cells.map((iso, idx) => {
          if (!iso) return <div key={`empty-${idx}`} />;
          const d = new Date(iso).getDate();
          const has = datesWithAppts.has(iso);
          const isSelected = iso === selectedDate;
          return (
            <button
              key={iso}
              onClick={() => setSelectedDate(iso)}
              style={{
                textAlign: "left",
                padding: 8,
                borderRadius: 10,
                border: isSelected ? "2px solid #06b6d4" : "1px solid #ccc",
                background: "#0f172a",
                color: "#e2e8f0",
                position: "relative",
                minHeight: 64,
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 700 }}>{d}</div>
              {has && (
                <span
                  title="Hay citas"
                  style={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        className="card"
        style={{ background: "#0b1324", border: "1px solid #1e293b", borderRadius: 12, padding: 16 }}
      >
        <h3 style={{ marginTop: 0 }}>Citas para {selectedDate}</h3>
        {selectedList.length === 0 ? (
          <p>No hay citas.</p>
        ) : (
          <ul>
            {selectedList.map((a) => (
              <li key={a.id}>
                <strong>{a.time ?? "Sin hora"}</strong> — {a.patient} {a.notes ? `· ${a.notes}` : ""}
              </li>
            ))}
          </ul>
        )}

        <AddQuickForm onAdd={handleAddQuick} />
      </div>
    </div>
  );
}

function AddQuickForm({ onAdd }: { onAdd: (patient: string, time?: string) => void }) {
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!patient.trim()) return;
        onAdd(patient.trim(), time || undefined);
        setPatient("");
        setTime("");
      }}
      style={{ display: "grid", gap: 8, maxWidth: 420 }}
    >
      <label>
        Paciente
        <input
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          placeholder="Nombre del paciente"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#0f172a",
            color: "#e2e8f0",
          }}
        />
      </label>
      <label>
        Hora (opcional)
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="HH:mm"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#0f172a",
            color: "#e2e8f0",
          }}
        />
      </label>
      <button
        type="submit"
        style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #0ea5e9", background: "#67e8f9", cursor: "pointer" }}
      >
        Agregar cita
      </button>
    </form>
  );
}
