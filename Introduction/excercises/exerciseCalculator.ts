interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Input {
  values: number[];
  target: number;
}

const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

const validateInputs = (args: string[]): Input => {
  if (args.length < 5) throw new Error("Invalid number of inputs");
  const values = [];
  let target: number;

  for (let i = 3; i < args.length; i++) {
    if (!isNotNumber(args[i])) values.push(Number(args[i]));
    else throw new Error(`Input ${args[i]} not a number`);
  }

  if (!isNotNumber(args[2])) target = Number(args[2]);
  else throw new Error(`Input ${args[2]} is not a number`);

  return {
    values: values,
    target: target,
  };
};

export const calculateExcercises = (
  values: number[],
  target: number
): Result => {
  const periodLength = values.length;
  const trainingDays = values.filter((day) => day !== 0).length;
  const success = periodLength === trainingDays;
  const average = values.reduce((x, y) => x + y) / periodLength;
  const rating = success
    ? 3
    : trainingDays >= periodLength - (1 / 3) * periodLength
    ? 2
    : 1;
  let ratingDescription = "";
  switch (rating) {
    case 1:
      ratingDescription = "Bad";
      break;
    case 2:
      ratingDescription = "good enough";
      break;
    case 3:
      ratingDescription = "Good";
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  const { values, target } = validateInputs(process.argv);
  console.log(calculateExcercises(values, target));
} catch (error: unknown) {
  let message = "Something bad happened";
  if (error instanceof Error) {
    message += " Error" + error.message;
  }
  console.log(message);
}
