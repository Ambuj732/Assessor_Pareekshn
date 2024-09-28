import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const uploadDashboardImages = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/exam/uploadDashboardImage`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Uploaded Images response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in uploading images:: ", error);
    throw error;
  }
};

export default uploadDashboardImages;
