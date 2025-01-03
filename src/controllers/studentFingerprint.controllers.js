import { enrollFingerprint } from "../services/enrollmentService.js";
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
  const { rawFingerprintData, action, amount } = req.body;

  if (!rawFingerprintData || !action) {
    return res.status(400).json({ status: 'failure', message: 'Missing fingerprint data or action.' });
  }

  try {
    const student = await verifyFingerprintFromHardware(rawFingerprintData);

    switch (action) {
      case 'getBalance':
        return res.status(200).json({ status: 'success', balance: student.balance });

      case 'getDetails':
        return res.status(200).json({ status: 'success', student });

      case 'getPayments':
        const payments = await getPaymentsByFingerprint(student.fingerprintId);
        return res.status(200).json({ status: 'success', payments });

      case 'makePayment':
        if (!amount || amount <= 0) {
          return res.status(400).json({ status: 'failure', message: 'Invalid payment amount.' });
        }
        // Mock payment logic here (e.g., record payment and update balance)
        return res.status(200).json({ status: 'success', message: 'Payment processed successfully.' });

      default:
        return res.status(400).json({ status: 'failure', message: 'Invalid action.' });
    }
  } catch (error) {
    res.status(500).json({ status: 'failure', message: error.message });
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
