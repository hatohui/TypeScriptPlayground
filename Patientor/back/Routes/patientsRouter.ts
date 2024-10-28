import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import {
  errorMiddleware,
  newPatientParser,
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

router.use(errorMiddleware);

export default router;
