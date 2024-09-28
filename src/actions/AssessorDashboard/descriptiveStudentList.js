import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const descriptiveStudentList = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/getDescriptiveStudentList`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Descriptive student response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in descriptive :: ", error);
    throw error;
  }
};

export default descriptiveStudentList;
