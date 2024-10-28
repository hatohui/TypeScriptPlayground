import { NewPatientEntrySchema } from "./utils";
import { z } from "zod";

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NoneSensitivePatientEntry = Omit<Patient, "ssn">;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;
