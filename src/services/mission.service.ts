import { MissionById, Missions, MissionState, MissionTag } from "@/models/mission.model";
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

export function findMissionStateByMissionId(mission_id: string) {
    try {
        return endpoint.get<MissionState>(enviromentDev.mission + `/${mission_id}/state`)
    } catch (error) {
        throw error
    }
}

export function findMissionTagByMissionId(mission_id: string) {
    try {
        return endpoint.get<MissionTag[]>(enviromentDev.mission + `/${mission_id}/tag`)
    } catch (error) {
        throw error
    }
}

export function updateMissionTagByMissionId(mission_id: string, tag_id: string, value: number) {
    const data = {
        status: value
    }
    try {
        return endpoint.put<MissionState>(enviromentDev.mission + `/${mission_id}/tag/${tag_id}`, data)
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
        return endpoint.get<MissionById>(`${enviromentDev.mission}/get-current-mission`)
    } catch (error) {
        throw error
    }
}

export function findMissionByMissionId(mission_id: string) {
    try {
        return endpoint.get<MissionById>(`${enviromentDev.mission}/${mission_id}`)
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

export function addCarToMissionByMissionIdAndCarId(mission_id: string, car_id: string) {
    console.log({
        MIS: mission_id,
        CAR: car_id
    });
    
    try {
        return endpoint.put(`${enviromentDev.mission}/${mission_id}/assign-car-to-mission/${car_id}`)
    } catch (error) {
        throw error
    }
}

export function unAddCarToMissionByMissionIdAndCarId(mission_id: string, car_id: string) {
    try {
        return endpoint.put(`${enviromentDev.mission}/${mission_id}/un-assign-car-to-mission/${car_id}`)
    } catch (error) {
        throw error
    }
}

export function unJionMissioon(mission_id: string) {
    try {
        return endpoint.put(`${enviromentDev.mission}/${mission_id}/un-join-mission`)
    } catch (error) {
        throw error
    }
}