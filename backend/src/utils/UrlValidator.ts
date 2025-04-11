import axios from "axios";

export default async function isUrlReachable(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    return response.status < 400;
  } catch (err) {
    return false;
  }
}
