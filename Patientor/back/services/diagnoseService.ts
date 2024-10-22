import diagnosesData from "../Data/diagnoses";
import { Diagnoses } from "../types";

const getAll = (): Diagnoses[] => {
  return diagnosesData;
};

export default {
  getAll,
};
