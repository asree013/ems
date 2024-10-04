import { enviromentDev } from "@/configs/enviroment.dev";
import { endpoint } from "./endpoint.service";
import { Communicates } from "@/models/communicate.model";

export function findCommunicateAll(page: number, limit: number) {
    page? page : 1
    limit? limit: 10
    try {
        return endpoint.get<Communicates[]>(enviromentDev.communicate+ `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}