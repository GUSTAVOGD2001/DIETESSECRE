import React, { useState } from 'react';
import { Patient } from '../types';
import { PlusIcon } from './Icons';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onAddPatient: () => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onSelectPatient, onAddPatient }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = patients.filter(p => 
        `${p.name} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Directorio de Pacientes</h1>
         <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
               </div>
            </div>
            <button 
              onClick={onAddPatient}
              className="flex items-center justify-center px-4 py-2 font-bold text-white transition-colors whitespace-nowrap bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300">
                <PlusIcon className="w-5 h-5 mr-2" />
                Añadir Paciente
            </button>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <ul className="divide-y divide-slate-200">
          {filteredPatients.map((patient) => (
            <li key={patient.id} onClick={() => onSelectPatient(patient)} className="flex items-center p-4 cursor-pointer transition-colors hover:bg-sky-50">
              <img src={patient.avatarUrl} alt={`${patient.name} ${patient.lastName}`} className="w-12 h-12 rounded-full" />
              <div className="ml-4">
                <p className="text-lg font-semibold text-slate-800">{patient.name} {patient.lastName}</p>
                <p className="text-sm text-slate-500">{patient.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientList;