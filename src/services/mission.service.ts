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

export function findMission(page: number, limit: number) {
    try {
        return endpoint.get<Missions[]>(enviromentDev.mission+ `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}

export function joinMissionByAdmin(mission_id: string, user_id: string) {
    try {
        return endpoint.put(`${enviromentDev.mission}/${mission_id}/join-mission/${user_id}`)
    } catch (error) {
        throw error
    }
}