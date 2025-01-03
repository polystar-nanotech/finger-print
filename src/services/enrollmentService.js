

  import axios from "axios"; // Axios is used for making HTTP requests

const HARDWARE_API_URL =
  process.env.HARDWARE_API_URL || "http://102.22.168.183";

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
      ID: fingerprintId,
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
    console.error(error);
    console.error(error.message);
    return false;
  }
};

 
export const verifyFingerprint = async () => {
  try {
    // Send a POST request to the hardware's verification endpoint
    const response = await axios.post(`${HARDWARE_API_URL}/verify`, {
      message: "request",
    });
    console.log(response.data);
    
    // Check response status and return result
    if (response.data && response.data.status === "success" && response.data.message) {
      console.log(`Verification successful for Fingerprint ID: ${response.data.message}`);
      return { success: true, id: response.data.message };
    } else {
      console.error(`Verification failed for Fingerprint `);
      console.error(`Reason: ${response.data.message || "Unknown error"}`);
      return { success: false, id: null };
    }
  } catch (error) {
    // Handle errors from the hardware API
    console.error(`Error communicating with hardware for Fingerprint`);
    console.error(error.message);
    console.error(error);
    return { success: false, id: null };
  }
};
