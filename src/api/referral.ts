import axios, { AxiosResponse } from "axios";

export default async function (token: string, referrerId: string): Promise<AxiosResponse> {
  return await axios.post(
    `${process.env.BACKEND_URL}/v1/user/referrer`,
    { referrer: { userId: referrerId } },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
