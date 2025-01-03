import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get student details by fingerprint ID.
 */
export const getStudentByFingerprint = async (fingerprintId) => {
  try {
    const student = await prisma.student.findFirst({
      where: { fingerprintId },
    });
    if (!student) {
      throw new Error('Student not found.');
    }
    return student;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

/**
 * Get payments associated with a fingerprint ID.
 */
export const getPaymentsByFingerprint = async (fingerprintId) => {
  try {
    const student = await getStudentByFingerprint(fingerprintId);
    const payments = await prisma.payment.findMany({
      where: { studentId: student.id },
    });
    return payments;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
