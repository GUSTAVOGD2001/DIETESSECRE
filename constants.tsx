
import { Patient, Appointment } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    name: 'Carlos',
    lastName: 'Rivera',
    dateOfBirth: '1985-05-15',
    phone: '555-0101',
    email: 'carlos.rivera@example.com',
    avatarUrl: 'https://picsum.photos/seed/p1/200/200',
    photos: [
      'https://picsum.photos/seed/p1-photo1/800/600',
      'https://picsum.photos/seed/p1-photo2/800/600',
      'https://picsum.photos/seed/p1-photo3/800/600',
    ],
    consultations: [
      { id: 'c1-1', date: '2024-07-10', cost: 150, note: 'Limpieza profunda y revisión general. Se encontraron caries menores.' },
      { id: 'c1-2', date: '2024-05-20', cost: 250, note: 'Relleno de caries en molar superior derecho.' },
      { id: 'c1-3', date: '2024-01-05', cost: 120, note: 'Consulta inicial y radiografías.' },
    ],
  },
  {
    id: 2,
    name: 'Ana',
    lastName: 'Gomez',
    dateOfBirth: '1992-11-20',
    phone: '555-0102',
    email: 'ana.gomez@example.com',
    avatarUrl: 'https://picsum.photos/seed/p2/200/200',
    photos: [
      'https://picsum.photos/seed/p2-photo1/800/600',
      'https://picsum.photos/seed/p2-photo2/800/600',
    ],
    consultations: [
      { id: 'c2-1', date: '2024-06-18', cost: 1800, note: 'Inicio de tratamiento de ortodoncia. Colocación de brackets superiores.' },
      { id: 'c2-2', date: '2024-05-15', cost: 100, note: 'Estudio de ortodoncia y moldes.' },
    ],
  },
  {
    id: 3,
    name: 'Luis',
    lastName: 'Martinez',
    dateOfBirth: '1978-01-30',
    phone: '555-0103',
    email: 'luis.martinez@example.com',
    avatarUrl: 'https://picsum.photos/seed/p3/200/200',
    photos: [
      'https://picsum.photos/seed/p3-photo1/800/600',
    ],
    consultations: [
      { id: 'c3-1', date: '2024-07-01', cost: 1200, note: 'Implante dental en incisivo central.' },
      { id: 'c3-2', date: '2024-04-22', cost: 300, note: 'Extracción de pieza dañada.' },
    ],
  },
   {
    id: 4,
    name: 'Sofia',
    lastName: 'Hernandez',
    dateOfBirth: '2001-08-12',
    phone: '555-0104',
    email: 'sofia.h@example.com',
    avatarUrl: 'https://picsum.photos/seed/p4/200/200',
    photos: [
        'https://picsum.photos/seed/p4-photo1/800/600',
        'https://picsum.photos/seed/p4-photo2/800/600',
    ],
    consultations: [
      { id: 'c4-1', date: '2024-07-15', cost: 80, note: 'Revisión y pulido.' },
      { id: 'c4-2', date: '2023-12-10', cost: 220, note: 'Blanqueamiento dental láser.' },
    ],
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 2,
    patientName: 'Ana Gomez',
    patientAvatarUrl: 'https://picsum.photos/seed/p2/200/200',
    date: '2024-08-05',
    time: '10:00 AM',
    reason: 'Ajuste de ortodoncia',
  },
  {
    id: 'a2',
    patientId: 4,
    patientName: 'Sofia Hernandez',
    patientAvatarUrl: 'https://picsum.photos/seed/p4/200/200',
    date: '2024-08-05',
    time: '11:30 AM',
    reason: 'Revisión semestral',
  },
  {
    id: 'a3',
    patientId: 1,
    patientName: 'Carlos Rivera',
    patientAvatarUrl: 'https://picsum.photos/seed/p1/200/200',
    date: '2024-08-06',
    time: '09:00 AM',
    reason: 'Seguimiento de caries',
  },
  {
    id: 'a4',
    patientId: 3,
    patientName: 'Luis Martinez',
    patientAvatarUrl: 'https://picsum.photos/seed/p3/200/200',
    date: '2024-08-07',
    time: '02:00 PM',
    reason: 'Revisión de implante',
  },
];
