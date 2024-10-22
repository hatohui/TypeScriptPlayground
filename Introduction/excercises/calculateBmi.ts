interface Input {
  height: number;
  weight: number;
}

interface Result {
  height: number;
  weight: number;
  bmi: string;
}

const validateInputs = (args: any[]): Input => {
  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return { height: Number(args[0]), weight: Number(args[1]) };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight / Math.pow(height / 100, 2);
  if (BMI < 16) return "Underweight (Severe thinness)";
  if (BMI < 16.8) return "Underweight (Moderate thinness)";
  if (BMI < 18.4) return "Underweight (Mild thinness)";
  if (BMI < 24.9) return "Normal range";
  if (BMI < 29.9) return "Overweight (Pre-obese)";
  if (BMI < 34.9) return "Obese (Class I)";
  if (BMI < 39.9) return "Obese (Class II)";
  else return "Obese (Class III)";
};

export const getBMI = (
  input1: any,
  input2: any
): Result | { error: string } | undefined => {
  try {
    const { height, weight } = validateInputs([input1, input2]);
    return {
      height,
      weight,
      bmi: calculateBmi(height, weight),
    };
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);

    return { error: "invalid format" };
  }
};
