import React from 'react';
import { Patient } from '../types';
import { ArrowLeftIcon, PencilIcon } from './Icons';

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
  onEdit: (patient: Patient) => void;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient, onBack, onEdit }) => {
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button onClick={onBack} className="flex items-center mb-6 text-sm font-medium text-sky-600 hover:text-sky-800">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Volver a Pacientes
      </button>

      {/* Patient Header */}
      <div className="flex flex-col items-center p-8 mb-8 bg-white rounded-xl shadow-lg md:flex-row">
        <img src={patient.avatarUrl} alt={patient.name} className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8 ring-4 ring-sky-200" />
        <div className="flex-grow">
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-baseline">
            <h1 className="text-4xl font-bold text-center text-slate-800 md:text-left">{patient.name} {patient.lastName}</h1>
            <button
                onClick={() => onEdit(patient)}
                className="flex items-center px-3 py-1 text-sm font-medium text-white transition-colors rounded-md bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
                <PencilIcon className="w-4 h-4 mr-1" />
                Editar
            </button>
          </div>
          <div className="flex flex-wrap justify-center mt-2 text-slate-500 md:justify-start">
            <span className="mr-4"><strong>Edad:</strong> {calculateAge(patient.dateOfBirth)}</span>
            <span className="mr-4"><strong>Tel:</strong> {patient.phone}</span>
            <span><strong>Email:</strong> {patient.email}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Consultation History */}
        <div className="lg:col-span-2">
           <h2 className="mb-4 text-2xl font-semibold text-slate-800">Historial de Consultas</h2>
           <div className="space-y-4">
              {patient.consultations.map(consult => (
                <div key={consult.id} className="p-5 bg-white rounded-lg shadow-md">
                    <div className="flex items-baseline justify-between">
                        <p className="font-bold text-sky-600">{new Date(consult.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p className="text-lg font-semibold text-green-600">${consult.cost.toFixed(2)}</p>
                    </div>
                    <p className="mt-2 text-slate-600">{consult.note}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Photos */}
        <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-800">Fotos</h2>
            <div className="grid grid-cols-2 gap-4">
                {patient.photos.map((photo, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md">
                        <img src={photo} alt={`Patient photo ${index + 1}`} className="object-cover w-full h-32 transition-transform duration-300 hover:scale-110" />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;