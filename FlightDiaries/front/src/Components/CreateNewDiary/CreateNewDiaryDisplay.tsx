import { useStringField } from "../../Hooks/useField";
import DiaryService from "../../service/DiaryService";
import { z, ZodError, ZodIssue } from "zod";
import { Visibility, Weather } from "../../types/DiaryEntryType";
import axios from "axios";
import { useNotificationDispatch } from "../../contexts/NotificationContext";
import { useState } from "react";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const newDiarySchema = z.object({
  date: z.string().min(1, { message: "Date field is required!" }),
  weather: z.nativeEnum(Weather, { message: "Given weather is invalid." }),
  visibility: z.nativeEnum(Visibility, { message: "Invalid visibility" }),
  comment: z.string().min(1, { message: "comment field is required" }),
});

const CreateNewDiaryDisplay = (): JSX.Element => {
  const { reset: resetDate, ...date } = useStringField("date");
  const [weather, setWeather] = useState<string>("sunny");
  const [visibility, setVisibility] = useState<string>("great");

  const { reset: resetComment, ...comment } = useStringField("text");
  const dispatch = useNotificationDispatch();

  const handleNewDiaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const entry = {
        date: date.value,
        weather: weather,
        visibility: visibility,
        comment: comment.value,
      };
      console.log(entry);

      const toAdd = newDiarySchema.parse(entry);
      const response = await DiaryService.create(toAdd);
      console.log("Added: ", response);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log(error.status);
        console.error(error.response);
      } else if (error instanceof ZodError) {
        const errors = error.message;
        let message = "Bad Input:";
        JSON.parse(errors).forEach((e: ZodIssue) => {
          message = message.concat(` ${e.message}`);
        });
        dispatch({ type: "SET", payload: message });
        setTimeout(() => {
          dispatch({ type: "RESET" });
        }, 5000);
      } else {
        console.error(error);
      }
      resetDate();
      resetComment();
      setVisibility("");
      setWeather("");
    }
  };

  return (
    <div>
      <h3>Create new Diary</h3>
      <form onSubmit={handleNewDiaryCreation}>
        <div>
          <label>date </label>
          <input {...date}></input>
        </div>
        <div>
          <label>visibility </label>
          <div>
            <input
              defaultChecked
              onChange={(e) => setVisibility(e.target.value)}
              type="radio"
              value="great"
              name="vi"
            ></input>
            <label>great</label>
          </div>
          <div>
            <input
              type="radio"
              value="good"
              name="vi"
              onChange={(e) => setVisibility(e.target.value)}
            ></input>
            <label>good</label>
          </div>
          <input
            type="radio"
            value="ok"
            name="vi"
            onChange={(e) => setVisibility(e.target.value)}
          ></input>
          <label>ok</label>
          <div>
            <input
              type="radio"
              value="poor"
              name="vi"
              onChange={(e) => setVisibility(e.target.value)}
            ></input>
            <label>poor</label>
          </div>
        </div>
        <div>
          <label>weather </label>
          <input
            defaultChecked
            type="radio"
            value="sunny"
            name="we"
            onChange={(e) => setWeather(e.target.value)}
          ></input>
          <label>sunny</label>
          <input
            type="radio"
            value="rainy"
            name="we"
            onChange={(e) => setWeather(e.target.value)}
          ></input>
          <label>rainy</label>
          <input
            type="radio"
            value="cloudy"
            name="we"
            onChange={(e) => setWeather(e.target.value)}
          ></input>
          <label>cloudy</label>
          <input
            type="radio"
            value="stormy"
            name="we"
            onChange={(e) => setWeather(e.target.value)}
          ></input>
          <label>stormy</label>
          <input
            type="radio"
            value="windy"
            name="we"
            onChange={(e) => setWeather(e.target.value)}
          ></input>
          <label>windy</label>
        </div>
        <div>
          <label>comment </label>
          <input {...comment}></input>
        </div>
        <button type="submit">
          <label> Create </label>
        </button>
      </form>
      <br></br>
    </div>
  );
};

export default CreateNewDiaryDisplay;
