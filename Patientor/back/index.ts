import express from "express";
import diagnoseRouter from "./Routes/diagnoses";

//init
const app = express();
const cors = require("cors");

//setup
app.use(express.json());
app.use(cors());
app.use("/api/diagnoses", diagnoseRouter);

//something else
app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

//port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
