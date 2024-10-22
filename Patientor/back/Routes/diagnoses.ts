import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("all diagnoses data");
});

export default router;
