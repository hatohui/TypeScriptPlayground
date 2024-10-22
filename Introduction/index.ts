import express from "express";
import { getBMI } from "./excercises/calculateBmi";
import { calculateExcercises } from "./excercises/exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  res.send(getBMI(req.query.height, req.query.weight));
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  let result;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }

  try {
    result = calculateExcercises(daily_exercises as number[], Number(target));
  } catch (error: unknown) {
    res.status(400).send({
      error: "malformatted parameters",
    });
  }
  res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
