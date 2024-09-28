import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const setFeedbackAnswers = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/exam/setRatingWithIdA`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("get answer of feedback:: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in feedback :: ", error);
    throw error;
  }
};

export default setFeedbackAnswers;
