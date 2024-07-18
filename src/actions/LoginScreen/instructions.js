import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const instruction = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/instruction`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Instruction response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in :: ", error);
    throw error;
  }
};

export default instruction;
