import patientData from "../Data/patients";
import {
  EntryWithoutId,
  NewPatientEntry,
  NoneSensitivePatientEntry,
  Patient,
} from "../types";
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
    entries: [],
    ...entry,
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const getById = (id: string): Patient | undefined => {
  const toReturn = patientData.find((patient) => patient.id === id);
  return toReturn;
};

const addNewEntry = (patientId: string, entry: EntryWithoutId) => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patientData.map((patient) =>
    patient.id !== patientId
      ? patient
      : { ...patient, entries: patient.entries.push(newEntry) }
  );
  return newEntry;
};

export default {
  getNonSensitivePatientEntries,
  addNewPatient,
  getById,
  addNewEntry,
};
