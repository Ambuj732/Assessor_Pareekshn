import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const vivaStudentListMarking = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/getVivaStudentList`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Viva student list marking:: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in marking viva by student:: ", error);
    throw error;
  }
};

export default vivaStudentListMarking;
