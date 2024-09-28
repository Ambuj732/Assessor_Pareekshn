import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const vivamarking = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/setvivaMarks`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Viva  marking:: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in  viva marking :: ", error);
    throw error;
  }
};

export default vivamarking;
