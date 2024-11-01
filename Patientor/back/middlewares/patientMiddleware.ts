import { NextFunction } from "express";
import {
  diagnosisCodeChecker,
  NewEntrySchema,
  NewPatientEntrySchema,
} from "../utils";
import { Request, Response } from "express";
// import { Diagnosis } from "../types";
import { z } from "zod";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else if (error instanceof Error) {
    res.status(400).send({ error: error.message });
  } else {
    next(error);
  }
};

export const parseNewEntry = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(req.body);
    if (req.body.type === "OccupationalHealthcare") {
      if (!req.body.employerName || req.body.employerName.length < 3) {
        throw new Error("Employer's name is required");
      }
    }
    if (req.body.diagnosisCode) {
      diagnosisCodeChecker(req.body.diagnosisCode);
    }
    next();
  } catch (error: unknown) {
    next(error);
  }
};
