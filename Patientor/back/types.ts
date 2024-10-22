export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export type Gender = "male" | "female" | "other";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NoneSensitivePatientEntry = Omit<Patient, "ssn">;
