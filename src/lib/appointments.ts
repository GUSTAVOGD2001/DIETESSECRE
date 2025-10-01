// src/lib/appointments.ts
export type Appointment = {
  id: string;
  date: string;    // YYYY-MM-DD
  time?: string;   // HH:mm (opcional)
  patient: string;
  notes?: string;
};

const STORAGE_KEY = "dietessecre.appointments";

function readAll(): Appointment[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Appointment[]) : [];
}

function writeAll(list: Appointment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function listAppointments() {
  return readAll();
}

export function listByDate(date: string) {
  return readAll().filter((a) => a.date === date);
}

export function addAppointment(a: Appointment) {
  const all = readAll();
  all.push(a);
  writeAll(all);
}

export function removeAppointment(id: string) {
  const all = readAll().filter((a) => a.id !== id);
  writeAll(all);
}

export function seedIfEmpty() {
  if (readAll().length > 0) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const d1 = `${yyyy}-${mm}-${dd}`;
  writeAll([
    { id: "a1", date: d1, time: "10:00", patient: "Juan Pérez", notes: "Primera consulta" },
    { id: "a2", date: d1, time: "12:30", patient: "María López", notes: "Control" },
  ]);
}
