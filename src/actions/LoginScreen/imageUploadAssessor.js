import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const imageUploadAssessor = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/uploadbase64`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Image response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in :: ", error);
    throw error;
  }
};

export default imageUploadAssessor;
