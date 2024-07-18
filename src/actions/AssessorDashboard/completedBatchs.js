import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const completeBatch = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/completed/batchs`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Complete Batchs response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in :: ", error);
    throw error;
  }
};

export default completeBatch;
