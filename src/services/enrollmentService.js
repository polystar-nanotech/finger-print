

  import axios from "axios"; // Axios is used for making HTTP requests

const HARDWARE_API_URL =
  process.env.HARDWARE_API_URL || "http://hardware-device.local";

/**
 * Enroll a fingerprint in the hardware.
 *
 * @param {number} fingerprintId - The ID to assign to the fingerprint on the hardware.
 * @returns {Promise<boolean>} - Returns `true` if the enrollment was successful, otherwise `false`.
 */
export const enrollFingerprint = async (fingerprintId) => {
  try {
    // Send a POST request to the hardware's enrollment endpoint
    const response = await axios.post(`${HARDWARE_API_URL}/enroll`, {
      fingerprint_id: fingerprintId,
    });

    // Check response status
    if (response.data && response.data.status === "success") {
      console.log(`Enrollment successful for Fingerprint ID: ${fingerprintId}`);
      return true;
    } else {
      console.error(`Enrollment failed for Fingerprint ID: ${fingerprintId}`);
      console.error(`Reason: ${response.data.message || "Unknown error"}`);
      return false;
    }
  } catch (error) {
    // Handle errors from the hardware API
    console.error(
      `Error communicating with hardware for Fingerprint ID: ${fingerprintId}`
    );
    console.error(error.message);
    return false;
  }
};
