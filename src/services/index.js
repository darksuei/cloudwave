import Cookies from "js-cookie";
import axios from "axios";
const authToken = Cookies.get("authToken");

export const fetcher = async (url) =>
  await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => res.data);

export async function postResetPassword(urlid, urltoken, formData) {
  return await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/reset_password/${urlid}/${urltoken}`,
    formData
  );
}
