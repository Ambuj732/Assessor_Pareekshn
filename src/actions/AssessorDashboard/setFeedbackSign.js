import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const setFeedbackSign = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/exam/setSignA`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Feedback Sign:: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in feedback sign:: ", error);
    throw error;
  }
};

export default setFeedbackSign;
