import { Missions } from "@/models/mission.model";
import { endpoint } from "./endpoint.service";
import { enviromentDev } from "@/configs/enviroment.dev";

export function createMission(data: Missions) {
    try {
        return endpoint.post<Missions>(enviromentDev.mission, data)
    } catch (error) {
        throw error
    }
}