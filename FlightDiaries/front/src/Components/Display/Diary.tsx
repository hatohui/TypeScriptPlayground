import { NonSensitiveDiaryEntry } from "../../types/DiaryEntryType";

export const Diary = ({
  diary,
}: {
  diary: NonSensitiveDiaryEntry;
}): JSX.Element => {
  return (
    <div>
      <div>
        <h3>{diary.date}</h3>
      </div>
      <div>Weather: {diary.weather}</div>
      <div>Visibility: {diary.visibility}</div>
    </div>
  );
};
