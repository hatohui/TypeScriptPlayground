import patientData from "../Data/patients";
import { NoneSensitivePatientEntry } from "../types";

const getNonSensitivePatientEntries = (): NoneSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getNonSensitivePatientEntries };
