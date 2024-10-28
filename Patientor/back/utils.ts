import { Gender } from "./types";
import { z } from "zod";

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});
