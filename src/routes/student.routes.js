import { Router } from "express";
import {
  enrollStudent,
  getStudent,
  updateFingerprint,
  handleHardwareFingerprint
} from "../controllers/studentFingerprint.controllers";

const studentRoutes = Router();

studentRoutes.post("/enroll", enrollStudent);
studentRoutes.post("/verify", handleHardwareFingerprint);
studentRoutes.get("/:id", getStudent);
studentRoutes.put("/:id/fingerprint", updateFingerprint);

export default studentRoutes;
