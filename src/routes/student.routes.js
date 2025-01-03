import { Router } from "express";
import {
  enrollStudent,
  getStudent,
  updateFingerprint,
} from "../controllers/studentFingerprint.controllers";

const studentRoutes = Router();

studentRoutes.post("/enroll", enrollStudent);
studentRoutes.get("/:id", getStudent);
studentRoutes.put("/:id/fingerprint", updateFingerprint);

export default studentRoutes;
