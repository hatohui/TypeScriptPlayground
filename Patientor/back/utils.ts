import diagnosesData from "./Data/diagnoses";
import { Gender, HealthCheckRating } from "./types";
import { z } from "zod";

export const diagnosisCodeChecker = (entries: string[]) => {
  const listOfCodes = diagnosesData.map((d) => d.code);
  entries.forEach((string) => {
    if (!listOfCodes.includes(string)) {
      throw new Error("Invalid code at: " + string);
    }
  });
};

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});

export const NewEntrySchema = z.object({
  date: z.string().date("Invalid date."),
  description: z.string().min(4, { message: "Description is required" }),
  specialist: z.string().min(4, { message: "Specialist required" }),
  healthCheckRating: z
    .nativeEnum(HealthCheckRating, {
      message: "Invalid rating",
    })
    .optional(),
  diagnosisCodes: z.string().array().optional(),
  type: z.string(),
  discharge: z
    .object({
      date: z.string().date(),
      criteria: z.string(),
    })
    .optional(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});
