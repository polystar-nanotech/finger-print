import { enrollFingerprint,verifyFingerprint} from "../services/enrollmentService.js";
import { PrismaClient } from "@prisma/client";
import { verifyFingerprintFromHardware } from '../services/fingerprintService.js';
import { getPaymentsByFingerprint } from '../services/fingerprintService.js'; 
const prisma = new PrismaClient();

export const enrollStudent = async (req, res) => {
  const { studentId, fingerprintId } = req.body;

  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      return res
        .status(404)
        .json({ status: "failure", message: "Student not found." });
    }

    const enrollmentSuccess = await enrollFingerprint(fingerprintId);
    if (enrollmentSuccess) {
      await prisma.student.update({
        where: { id: studentId },
        data: { fingerprintId },
      });
      return res
        .status(200)
        .json({
          status: "success",
          message: "Fingerprint enrolled successfully.",
          fingerprintId,
        });
    }

    res
      .status(500)
      .json({
        status: "failure",
        message: "Enrollment failed. Please try again.",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failure", message: "An error occurred." });
  }
};


/**
 * Handle hardware fingerprint data and perform an action.
 */
export const handleHardwareFingerprint = async (req, res) => {
  try {
    const result = await verifyFingerprint();

    if (result.success) {
      console.log(`Fingerprint verified successfully! ID: ${result.id}`);
      res.json({ message: "Fingerprint verified successfully!", id: result.id });
    } else {
      console.error("Fingerprint verification failed.");
      res.status(400).json({ message: "Fingerprint verification failed." });
    }
  } catch (error) {
    console.error("Error processing fingerprint:", error.message);
    console.error("Error processing fingerprint:", error);
    res.status(500).json({ message: "An error occurred while verifying the fingerprint." });
  }
};






export const getStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });
    if (!student) {
      return res
        .status(404)
        .json({ status: "failure", message: "Student not found." });
    }

    res.status(200).json({ status: "success", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failure", message: "An error occurred." });
  }
};

export const updateFingerprint = async (req, res) => {
  const { id } = req.params;
  const { fingerprintId } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { fingerprintId },
    });

    res.status(200).json({ status: "success", student: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failure", message: "An error occurred." });
  }
};
