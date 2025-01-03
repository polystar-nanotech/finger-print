import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Verify fingerprint data and return the associated student.
 * 
 * @param {string} rawFingerprintData - The raw fingerprint data sent by the hardware.
 * @returns {Promise<Object|null>} - The student record if found, otherwise null.
 */
export const verifyFingerprintFromHardware = async (rawFingerprintData) => {
  try {
    console.log(`Verifying raw fingerprint data: ${rawFingerprintData}`);
    
    // Mock fingerprint matching logic
    const mockFingerprintId = 5; // Replace with actual logic to process and match raw data

    // Find student by fingerprint ID
    const student = await prisma.student.findFirst({
      where: { fingerprintId: mockFingerprintId },
    });

    if (!student) {
      throw new Error('No student found for the provided fingerprint.');
    }

    return student;
  } catch (error) {
    console.error(`Error verifying fingerprint:`, error.message);
    throw error;
  }
};



/**
 * Get payments associated with a student's fingerprint.
 * 
 * @param {number} fingerprintId - The ID of the fingerprint.
 * @returns {Promise<Array>} - A list of payment records.
 */
export const getPaymentsByFingerprint = async (fingerprintId) => {
    try {
      const student = await getStudentByFingerprint(fingerprintId);
  
      const payments = await prisma.payment.findMany({
        where: { studentId: student.id },
      });
  
      return payments;
    } catch (error) {
      console.error(`Error fetching payments for fingerprint ID ${fingerprintId}:`, error.message);
      throw error;
    }
  };