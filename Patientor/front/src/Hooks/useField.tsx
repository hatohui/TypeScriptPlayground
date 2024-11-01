import { ChangeEvent, useState } from "react";

export const useStringField = (type: string) => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const reset = () => setValue("");

  return {
    value,
    onChange,
    type,
    reset,
  };
};
