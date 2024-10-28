import CreateNewDiaryDisplay from "./Components/CreateNewDiary/CreateNewDiaryDisplay";
import DiaryDisplay from "./Components/Display/DiaryDisplay";
import Notification from "./Components/Notification/Notification";

const App = () => {
  return (
    <div>
      <Notification />
      <CreateNewDiaryDisplay />
      <DiaryDisplay />
    </div>
  );
};

export default App;
