import patientData from "../Data/patients";
import { NewPatientEntry, NoneSensitivePatientEntry, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitivePatientEntries = (): NoneSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default { getNonSensitivePatientEntries, addNewPatient };
