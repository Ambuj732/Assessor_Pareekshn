import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const descriptiveMarking = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/setDescriptiveMarks`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Descriptive Marking response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in descriptive Marking :: ", error);
    throw error;
  }
};

export default descriptiveMarking;
