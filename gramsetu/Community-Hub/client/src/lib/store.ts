import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Patient, User, RiskLevel } from './types';

interface AppState {
  user: User | null;
  patients: Patient[];
  language: 'en' | 'local';
  
  // Actions
  login: (pin: string) => boolean;
  register: (name: string, village: string, pin: string) => void;
  logout: () => void;
  
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'lastVisit'>) => void;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  setLanguage: (lang: 'en' | 'local') => void;
}

// Mock initial data
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    age: 45,
    village: 'Rampur',
    riskLevel: 'High',
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    symptoms: ['Fever', 'Breathlessness'],
    feverDays: 5,
    createdAt: new Date().toISOString(),
    notes: 'Patient has high fever for 5 days. Referred to PHC.'
  },
  {
    id: '2',
    name: 'Sita Devi',
    age: 28,
    village: 'Sonpur',
    riskLevel: 'Low',
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    symptoms: ['Headache'],
    createdAt: new Date().toISOString(),
    notes: 'Mild headache. Prescribed rest.'
  },
  {
    id: '3',
    name: 'Gopal Singh',
    age: 62,
    village: 'Rampur',
    riskLevel: 'Medium',
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    symptoms: ['Cough', 'Fatigue'],
    createdAt: new Date().toISOString(),
    notes: 'Persistent cough.'
  }
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null, // Start unauthenticated
      patients: MOCK_PATIENTS,
      language: 'en',

      login: (pin) => {
        const user = get().user;
        if (user && user.pin === pin) {
          set({ user: { ...user, isAuthenticated: true } });
          return true;
        }
        return false;
      },

      register: (name, village, pin) => {
        set({
          user: {
            name,
            village,
            pin,
            isAuthenticated: true
          }
        });
      },

      logout: () => {
        set((state) => ({
          user: state.user ? { ...state.user, isAuthenticated: false } : null
        }));
      },

      addPatient: (patientData) => {
        const newPatient: Patient = {
          ...patientData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          lastVisit: new Date().toISOString(),
        };
        set((state) => ({ patients: [newPatient, ...state.patients] }));
      },

      updatePatient: (id, data) => {
        set((state) => ({
          patients: state.patients.map((p) => 
            p.id === id ? { ...p, ...data } : p
          )
        }));
      },

      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'asha-care-storage',
    }
  )
);

export const calculateRisk = (symptoms: string[], feverDays?: number): RiskLevel => {
  let score = 0;
  
  if (symptoms.includes('Breathlessness')) score += 3;
  if (symptoms.includes('Fever')) score += 1;
  if (feverDays && feverDays > 3) score += 2;
  if (symptoms.includes('Cough')) score += 1;
  if (symptoms.includes('Diarrhea')) score += 1;
  
  if (score >= 3) return 'High';
  if (score >= 1) return 'Medium';
  return 'Low';
};
