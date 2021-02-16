export interface Patient {
  patientId?: string;
  name: string;
  lastname: string;
  birthDate: Date;
  targetCalories: number;
  basalMetabolism: number;
  estimatedDailyEnergyExpenditure: number;
}
