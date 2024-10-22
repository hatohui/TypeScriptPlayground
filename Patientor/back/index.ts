//apply domain-driven design where we separate the logic from the router to services

import express from "express";
import diagnoseRouter from "./Routes/diagnosesRouter";
import patientRouter from "./Routes/patientsRouter";

//init
const app = express();
const cors = require("cors");

//setup
app.use(express.json());
app.use(cors());
app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

//something else
app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

//port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}, link: http://localhost:${PORT}`);
});
