import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const fetchPhotoSlider = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/init/getPhotoSlider`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Photo slider response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in  Photo slider api :: ", error);
    throw error;
  }
};

export default fetchPhotoSlider;
