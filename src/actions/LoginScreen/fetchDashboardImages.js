import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const fetchDashboardImages = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsuser/assessor/exam/fetchDashboardImages`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Fetched Images response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in fetching images:: ", error);
    throw error;
  }
};

export default fetchDashboardImages;
