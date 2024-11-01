import diagnosesData from "../Data/diagnoses";
import { Diagnosis } from "../types";

const getAll = (): Diagnosis[] => {
  return diagnosesData;
};

export default {
  getAll,
};
