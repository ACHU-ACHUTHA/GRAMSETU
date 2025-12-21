export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Patient {
  id: string;
  name: string;
  age: number;
  village: string;
  riskLevel: RiskLevel;
  lastVisit: string; // ISO date string
  symptoms: string[];
  feverDays?: number;
  notes?: string;
  createdAt: string;
}

export interface User {
  name: string;
  village: string;
  pin: string;
  isAuthenticated: boolean;
}

export const VILLAGES = [
  "Rampur",
  "Sonpur",
  "Madhupur",
  "Chandpur",
  "Bishanpur"
];

export const SYMPTOMS_LIST = [
  "Fever",
  "Cough",
  "Breathlessness",
  "Fatigue",
  "Headache",
  "Body Ache",
  "Diarrhea",
  "Loss of Taste/Smell"
];
