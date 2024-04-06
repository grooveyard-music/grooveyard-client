import axios from "axios";

import { BASE_URL } from "../../../config";

const settingsApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


