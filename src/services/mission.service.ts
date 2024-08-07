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
        return endpoint.get<Missions[]>(enviromentDev.mission + `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}

export function joinMissionByAdmin(mission_id: string, user_id: string) {
    try {
        return endpoint.put<Missions>(`${enviromentDev.mission}/${mission_id}/join-mission/${user_id}`)
    } catch (error) {
        throw error
    }
}

export function joinMission(mission_id: string) {
    try {
        return endpoint.put<Missions>(`${enviromentDev.mission}/${mission_id}/join-mission`)
    } catch (error) {
        throw error
    }
}
export function leaveMission(mission_id: string) {
    try {
        return endpoint.put<Missions>(`${enviromentDev.mission}/${mission_id}/un-join-mission`)
    } catch (error) {
        throw error
    }
}


export function findMissionCurrent() {
    try {
        return endpoint.get<Missions[]>(`${enviromentDev.mission}/get-current-mission`)
    } catch (error) {
        throw error
    }
}

export function findMissionByMissionId(mission_id: string) {
    try {
        return endpoint.get<Missions>(`${enviromentDev.mission}/${mission_id}`)
    } catch (error) {
        throw error
    }
}

export function updateMissionByMissionId(mission_id: string, data: Missions) {
    try {
        return endpoint.put<Missions>(`${enviromentDev.mission}/${mission_id}`, data)
    } catch (error) {
        throw error
    }
}