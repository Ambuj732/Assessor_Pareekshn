import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const setDescriptiveAnswerStudent = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/getStudentAnswers`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Descriptive Answer response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in descriptive Answer :: ", error);
    throw error;
  }
};

export default setDescriptiveAnswerStudent;
