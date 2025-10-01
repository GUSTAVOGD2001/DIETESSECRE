import React, { useState } from 'react';
import { UserRole, Patient, Appointment } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import PatientProfile from './components/PatientProfile';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS } from './constants';
import { HomeIcon, UsersIcon, LogoutIcon, CalendarIcon } from './components/Icons';
import PatientForm from './components/PatientForm';
import AppointmentForm from './components/AppointmentForm';

type View = 'dashboard' | 'patients' | 'profile';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserRole | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  
  const [isPatientFormOpen, setIsPatientFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false);


  const handleLogin = (role: UserRole) => {
    setCurrentUser(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('profile');
  };
  
  const handleBackToList = () => {
      setSelectedPatient(null);
      setCurrentView('patients');
  }

  const handleOpenAddPatientForm = () => {
    setEditingPatient(null);
    setIsPatientFormOpen(true);
  };

  const handleOpenEditPatientForm = (patient: Patient) => {
    setEditingPatient(patient);
    setIsPatientFormOpen(true);
  };

  const handleClosePatientForm = () => {
    setIsPatientFormOpen(false);
    setEditingPatient(null);
  };
  
  const handleSavePatient = (patientData: Partial<Patient>) => {
    if (patientData.id) {
      const updatedPatients = patients.map(p => p.id === patientData.id ? { ...p, ...patientData } as Patient : p);
      setPatients(updatedPatients);
      if (selectedPatient && selectedPatient.id === patientData.id) {
        setSelectedPatient(updatedPatients.find(p => p.id === patientData.id) || null);
      }
    } else {
      const newPatient: Patient = {
        id: Math.max(0, ...patients.map(p => p.id)) + 1,
        name: patientData.name || '',
        lastName: patientData.lastName || '',
        dateOfBirth: patientData.dateOfBirth || '',
        phone: patientData.phone || '',
        email: patientData.email || '',
        avatarUrl: `https://picsum.photos/seed/p${Date.now()}/200/200`,
        photos: [],
        consultations: [],
      };
      setPatients([...patients, newPatient]);
    }
    handleClosePatientForm();
  };

  const handleOpenAppointmentForm = () => setIsAppointmentFormOpen(true);
  const handleCloseAppointmentForm = () => setIsAppointmentFormOpen(false);
  
  const handleSaveAppointment = (appointmentData: Omit<Appointment, 'id' | 'patientName' | 'patientAvatarUrl'>) => {
      const patient = patients.find(p => p.id === appointmentData.patientId);
      if (!patient) return;

      const newAppointment: Appointment = {
          ...appointmentData,
          id: `a${Date.now()}`,
          patientName: `${patient.name} ${patient.lastName}`,
          patientAvatarUrl: patient.avatarUrl,
      };
      setAppointments([...appointments, newAppointment].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      handleCloseAppointmentForm();
  };


  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }
  
  const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }> = ({ icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-sky-500 text-white'
          : 'text-slate-200 hover:bg-sky-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );


  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard patients={patients} appointments={appointments} />;
      case 'patients':
        return <PatientList patients={patients} onSelectPatient={handleSelectPatient} onAddPatient={handleOpenAddPatientForm} />;
      case 'profile':
        return selectedPatient ? <PatientProfile patient={selectedPatient} onBack={handleBackToList} onEdit={handleOpenEditPatientForm} /> : <PatientList patients={patients} onSelectPatient={handleSelectPatient} onAddPatient={handleOpenAddPatientForm} />;
      default:
        return <Dashboard patients={patients} appointments={appointments} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="flex flex-col w-64 p-4 text-white bg-sky-900">
        <div className="flex items-center mb-10">
            <h1 className="text-2xl font-bold">Smile Center</h1>
        </div>
        <nav className="flex-grow space-y-2">
            <NavItem icon={<HomeIcon className="w-5 h-5" />} label="Inicio" isActive={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
            <NavItem icon={<UsersIcon className="w-5 h-5" />} label="Pacientes" isActive={currentView === 'patients' || currentView === 'profile'} onClick={() => setCurrentView('patients')} />
        </nav>
        <div className="px-2 py-4">
            <button
                onClick={handleOpenAppointmentForm}
                className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-transform transform bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 hover:scale-105"
            >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Agendar Cita
            </button>
        </div>
        <div className="pt-4 mt-auto border-t border-sky-800">
          <div className="p-2 mb-4 text-center bg-sky-800 rounded-lg">
            <p className="text-sm font-semibold text-white">{currentUser}</p>
          </div>
          <NavItem icon={<LogoutIcon className="w-5 h-5" />} label="Cerrar Sesión" isActive={false} onClick={handleLogout} />
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {isPatientFormOpen && <PatientForm patient={editingPatient} onSave={handleSavePatient} onCancel={handleClosePatientForm} />}
        {isAppointmentFormOpen && <AppointmentForm patients={patients} onSave={handleSaveAppointment} onCancel={handleCloseAppointmentForm} />}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;