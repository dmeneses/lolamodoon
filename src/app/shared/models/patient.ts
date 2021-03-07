export interface Patient {
  id?: string;
  name: string;
  pathology: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: number;
  activityLevelMeasure: number;
  corporalFatPercentage: number;
  dietGoal: string;
  dietGoalPace: number;
  refeedsPerWeek: number;
}
