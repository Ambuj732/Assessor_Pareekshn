import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const fetchFeedbackDetails = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/exam/getFeedbackA`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Feedback details:: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in fetching details:: ", error);
    throw error;
  }
};

export default fetchFeedbackDetails;
