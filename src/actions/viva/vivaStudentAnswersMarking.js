import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const vivaStudentAnswersMarking = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/getStudentVivaAnswers`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Viva student Answer marking:: ", response);
    return response;
  } catch (error) {
    console.log(
      "Error while logging in marking viva answer by student:: ",
      error
    );
    throw error;
  }
};

export default vivaStudentAnswersMarking;
