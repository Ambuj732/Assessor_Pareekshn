import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const feedBackAnswer = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/exam/getFeedbackSingleA`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("feedback answer:: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in feedback answer :: ", error);
    throw error;
  }
};

export default feedBackAnswer;
