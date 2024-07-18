import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const candidateExamStatusandDetailsList = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/students/bybatch`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log(
      "Candidate Exam Status and Details List response :: ",
      response
    );
    return response;
  } catch (error) {
    console.log("Error while logging in :: ", error);
    throw error;
  }
};

export default candidateExamStatusandDetailsList;
