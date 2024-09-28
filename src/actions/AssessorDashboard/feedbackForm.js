import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const feedbackForm = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/exam/setFeedbackDetails`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Feedback form:: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in  feedback form :: ", error);
    throw error;
  }
};

export default feedbackForm;
