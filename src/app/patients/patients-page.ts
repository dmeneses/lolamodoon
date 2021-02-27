import { Patient } from "../shared/models/patient";

export interface PatientsPage {

   loading: boolean;
   patients: Patient[];
   formStatus: string;
   filter?: {
      name: string
   };

   totalPatients: number;
}