import axios, { AxiosResponse } from "axios";

export interface AuthenticateParams {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
}

export default async function (data: AuthenticateParams): Promise<AxiosResponse> {
  const { id, hash, auth_date, ...rest } = data;
  return await axios.post(`${process.env.BACKEND_URL}/v2/auth/sign-in`, {
    auth: {
      __scheme: "telegram",
      bot: { id: process.env.BOT_ID },
      hash: hash,
      auth_date: Number(auth_date),
      user: { id: Number(id), ...rest }
    }
  });
}
