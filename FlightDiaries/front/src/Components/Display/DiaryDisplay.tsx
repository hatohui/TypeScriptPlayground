import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "../../types/DiaryEntryType";
import { Diary } from "./Diary";
import DiaryService from "../../service/DiaryService";
import { useNotificationDispatch } from "../../contexts/NotificationContext";

const DiaryDisplay = (): JSX.Element => {
  const [data, setData] = useState<NonSensitiveDiaryEntry[]>([]);
  const dispatch = useNotificationDispatch();
  useEffect(() => {
    DiaryService.getAll()
      .then((data) => setData(data))
      .catch((error) => {
        dispatch({ type: "SET", payload: error.message });
      });
  }, []);

  return (
    <div>
      <h3>Diary entries</h3>
      {data.map((diary) => {
        return (
          <div key={diary.id}>
            <Diary diary={diary} />
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryDisplay;
