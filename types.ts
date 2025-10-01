
export enum UserRole {
  ADMIN = 'Admin',
  SECRETARY = 'Secretaria',
}

export interface Consultation {
  id: string;
  date: string;
  cost: number;
  note: string;
}

export interface Patient {
  id: number;
  name: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  avatarUrl: string;
  photos: string[];
  consultations: Consultation[];
}

export interface Appointment {
  id: string;
  patientId: number;
  patientName: string;
  patientAvatarUrl: string;
  time: string;
  date: string;
  reason: string;
}
