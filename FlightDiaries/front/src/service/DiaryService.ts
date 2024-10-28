import axios from "axios";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types/DiaryEntryType";

const URL = "http://localhost:3000";

const getAll = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(
    `${URL}/api/diaries`
  );
  return response.data;
};

const create = async (
  diaryEntry: NewDiaryEntry
): Promise<NonSensitiveDiaryEntry> => {
  const response = await axios.post<NonSensitiveDiaryEntry>(
    `${URL}/api/diaries`,
    diaryEntry
  );
  return response.data;
};

export default { getAll, create };
