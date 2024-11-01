import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import {
  errorMiddleware,
  newPatientParser,
  parseNewEntry,
} from "../middlewares/patientMiddleware";
import { NewPatientEntry, NoneSensitivePatientEntry, Patient } from "../types";
const router = express.Router();

//handle a get
router.get("/", (_req, res: Response<NoneSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

//handle a post
router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addNewPatient(req.body);
    res.json(addedPatient);
  }
);

//get with id
router.get("/:id", (_req, res) => {
  const id = _req.params.id;
  const patientToReturn = patientService.getById(id);
  if (patientToReturn) res.json(patientToReturn);
  else res.status(404).send({ error: "User not found" });
});

router.post("/:id/entries", parseNewEntry, (_req, res) => {
  const id = _req.params.id;

  const toReturn = patientService.addNewEntry(id, _req.body);

  if (toReturn) res.json(toReturn);
  else res.status(404).send({ error: "Something went wrong" });
});

router.use(errorMiddleware);

export default router;
