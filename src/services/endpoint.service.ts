import { enviromentDev } from "@/interfaces/enviroment.dev";
import axios from "axios";

export const endpoint = axios.create({
  baseURL: enviromentDev.baseUrl,
  timeout: 5000,
});

